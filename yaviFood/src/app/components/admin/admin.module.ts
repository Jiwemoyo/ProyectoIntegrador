import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PlatillosComponent } from './platillos/platillos.component';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { PagoComponent } from './pago/pago.component';
import { PagoPaypalComponent } from './pago-paypal/pago-paypal.component';




@NgModule({
  declarations: [
    PlatillosComponent,
    UsuariosComponent,
    PerfilesComponent,
    PagoComponent,
    PagoPaypalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
