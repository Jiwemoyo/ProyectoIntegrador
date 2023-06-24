import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppModule } from 'src/app/app.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class PagesModule { }
