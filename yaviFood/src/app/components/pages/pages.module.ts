import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class PagesModule { }
