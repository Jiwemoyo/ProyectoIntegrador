import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import Swal from 'sweetalert2';

//window.paypal
declare var paypal: any;

@Component({
  selector: 'app-pago-paypal',
  templateUrl: './pago-paypal.component.html',
  styleUrls: ['./pago-paypal.component.css']
})
export class PagoPaypalComponent implements OnInit {
  @Input()
  order!: Order;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'CAD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe(
            {
              next: (orderId) => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + orderId);
                Swal.fire({
                  icon: 'success',
                  title: 'Pago guardado con éxito',
                  text: 'Éxito',
                });
              },
              error: (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al guardar el pago',
                  text: 'Error',
                });
              }
            }
          );
        },

        onError: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Pago Fallido',
            text: 'Error',
          });
          console.log(err);
          console.log("errores")
        },
      })
      .render(this.paypalElement.nativeElement);

  }
}
