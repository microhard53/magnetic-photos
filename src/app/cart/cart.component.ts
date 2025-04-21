import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FileSizePipe } from '../shared/file-size.pipe';
import { DeliveryDetailsComponent } from '../delivery-details/delivery-details.component';
import { DeliveryDetails, Order } from '../shared/types';

interface CartPhoto {
  url: string;
  name: string;
  size: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    RouterModule,
    FileSizePipe,
    DeliveryDetailsComponent
  ]
})
export class CartComponent implements OnInit {
  cartPhotos: CartPhoto[] = [];
  deliveryDetails: DeliveryDetails | null = null;
  private orders: Order[] = [];
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCartPhotos();
    this.loadOrders();
  }

  private loadCartPhotos() {
    const savedPhotos = localStorage.getItem('cartPhotos');
    if (savedPhotos) {
      try {
        this.cartPhotos = JSON.parse(savedPhotos);
      } catch (e) {
        console.error('Error parsing cart photos:', e);
        this.cartPhotos = [];
      }
    }
  }

  private loadOrders() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        this.orders = JSON.parse(savedOrders);
      } catch (e) {
        console.error('Error parsing orders:', e);
        this.orders = [];
      }
    }
  }

  onDeliveryDetailsChange(details: DeliveryDetails) {
    this.deliveryDetails = details;
    localStorage.setItem('deliveryDetails', JSON.stringify(details));
  }

  removeFromCart(index: number) {
    this.cartPhotos.splice(index, 1);
    localStorage.setItem('cartPhotos', JSON.stringify(this.cartPhotos));
  }

  placeOrder() {
    if (this.deliveryDetails && this.cartPhotos.length > 0) {
      const order: Order = {
        id: this.generateOrderId(),
        photos: [...this.cartPhotos],
        deliveryDetails: this.deliveryDetails,
        totalAmount: this.cartPhotos.length * 5.99,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      this.orders.push(order);
      localStorage.setItem('orders', JSON.stringify(this.orders));
      
      // Clear the cart
      this.cartPhotos = [];
      localStorage.removeItem('cartPhotos');

      // Redirect to Paystack payment page
       this.generatePaystackUrl(order);

    }
  }

  private generateOrderId(): string {
    return 'ORD-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  private generatePaystackUrl(order: Order) {
    // Replace with your Paystack public key
    const paystackPublicKey = 'pk_test_d54fe15ada007522c9bcf88608e08000cd1ec5db';
    
    const handler = (window as any).PaystackPop.setup({
      key: paystackPublicKey,
      email: 'customer@example.com',
      amount: (order.totalAmount * 100).toString(), // Convert to kobo
      currency: 'ZAR',
      ref: order.id,
      callback_url: `http://localhost:4200/order-confirmation/${order.id}`,
      metadata: {
        order_id: order.id,
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: order.id
          }
        ]
      }
    });

    handler.openIframe();
  }
}