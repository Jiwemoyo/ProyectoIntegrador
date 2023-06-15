import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from '../partials/header/header.component';
import { PlatillosComponent } from './platillos/platillos.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    PlatillosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
