import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Order } from '../shared/types';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['order-confirmation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  paymentVerified = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    const reference = this.route.snapshot.queryParamMap.get('reference');
    const trxref = this.route.snapshot.queryParamMap.get('trxref');

    if (!orderId || !reference || !trxref) {
      this.errorMessage = 'Invalid payment confirmation. Missing required parameters.';
      this.loading = false;
      return;
    }

    this.verifyPayment(orderId, reference);
  }

  private async verifyPayment(orderId: string, reference: string) {
    try {
      // In a real application, you would verify the payment with your backend
      // For demo purposes, we'll simulate a successful verification
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderIndex = orders.findIndex((order: Order) => order.id === orderId);

      if (orderIndex === -1) {
        this.errorMessage = 'Order not found.';
        this.loading = false;
        return;
      }

      // Update order status to paid
      orders[orderIndex] = {
        ...orders[orderIndex],
        status: 'paid'
      };
      localStorage.setItem('orders', JSON.stringify(orders));

      this.order = orders[orderIndex];
      this.paymentVerified = true;
      this.loading = false;

      // Show success message
      this.snackBar.open('Payment successful! Your order has been confirmed.', 'Close', {
        duration: 5000,
        panelClass: ['success-snackbar']
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      this.errorMessage = 'Failed to verify payment. Please contact support.';
      this.loading = false;
    }
  }

  navigateToOrderHistory() {
    this.router.navigate(['/order-history']);
  }
}