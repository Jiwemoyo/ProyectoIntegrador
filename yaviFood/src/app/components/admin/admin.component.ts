import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  cartQuantity=0;
  user!:User
  constructor(cartService:CartService,private userService:UserService) {
    cartService.getCartObservable().subscribe((newCart) =>{
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }
  //Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;       
}

  ngOnInit(): void {

  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
