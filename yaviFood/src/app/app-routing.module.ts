import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NoFoundPageComponent } from './components/partials/no-found-page/no-found-page.component';
import { AdminRoutingModule } from './components/admin/admin-routing.module';
import { PagesRoutingModule } from './components/pages/pages-routing.module';
import { PagesComponent } from './components/pages/pages.component';
import { PaypalComponent } from './components/partials/paypal/paypal.component';

const routes: Routes = [
  { path: '', redirectTo: '/cliente', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoFoundPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule, PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
