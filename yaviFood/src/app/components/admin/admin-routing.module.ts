import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlatillosComponent } from './platillos/platillos.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children:[
      {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
      {path: 'crud', component: PlatillosComponent, canActivate:[AuthGuard]},
      {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
      {path: 'ordenes', component: OrdersComponent, canActivate:[AuthGuard]},
      {path: '', redirectTo:'dashboard', pathMatch:'full'},
     
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
