import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    const userId = this.userService.currentUserId; 
    
    this.orderService.getUserOrders(userId).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        console.log('Error al recuperar las órdenes del usuario:', error);
      }
    );
  }
  viewOrderDetail(orderId: number): void {
    this.router.navigate(['/track', orderId]);
  }
}
