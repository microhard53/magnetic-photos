import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { CartComponent } from './cart/cart.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { AuthComponent } from './auth/auth.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [ 
    { path: '', component: LandingPageComponent },
    { path: 'photo-upload', component: PhotoUploadComponent },
    { path: 'cart', component: CartComponent },
    { path: 'delivery-details', component: DeliveryDetailsComponent }, 
    { path: 'auth', component: AuthComponent },
    { path: 'order-confirmation/:id', component: OrderConfirmationComponent },
    { path: 'order-history', component: OrderHistoryComponent },  
    { path: '**', redirectTo: '' }];
