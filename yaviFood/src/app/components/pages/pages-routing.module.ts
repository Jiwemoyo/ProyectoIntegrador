import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PagesComponent } from './pages.component';
import { PaymentComponent } from './payment/payment.component';
import { PagoComponent } from '../admin/pago/pago.component';
import { OrderTrackPageComponent } from '../partials/order-track-page/order-track-page.component';


const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children:[
      {path: '', component: HomeComponent},
      {path:'search/:searchTerm',component:HomeComponent},
      {path:'tag/:tag',component:HomeComponent},
      {path:'food/:id',component:FoodPageComponent},
      {path:'cart-page',component:CartPageComponent},
      {path:'login',component:LoginPageComponent},
      {path:'register',component:RegisterPageComponent},
      {path:'checkout',component:CheckoutPageComponent, canActivate:[AuthGuard]},
      {path:'payment',component:PagoComponent, canActivate:[AuthGuard]},
      {path:'track/:orderId',component:OrderTrackPageComponent, canActivate:[AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
