import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage()
  private cartSubjet: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)


  constructor() { }

  addToCart(food:Food):void{
    let cartItem = this.cart.items
    .find(item => item.food.id === food.id)
    if (cartItem)
      return
    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage()
   }

  removeFromCart(foodId:string):void{
    this.cart.items=this.cart.items
    .filter(item => item.food.id != foodId)
    this.setCartToLocalStorage()
  }

  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items
    .find(item => item.food.id === foodId)

    if(!cartItem) return

    cartItem.quantity=quantity
    cartItem.price=quantity*cartItem.food.price
    this.setCartToLocalStorage()
  }

  clearCart(){
    this.cart=new Cart()
    this.setCartToLocalStorage()
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubjet.asObservable()
  }

  private setCartToLocalStorage():void{
    //esto es para guardar en el local storage para que no se borre cuando se refresque
    this.cart.totalPrice=this.cart.items
    .reduce((prevSum, currentItem)=> prevSum+currentItem.price,0)
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem)=>prevSum + currentItem.quantity,0)

    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart',cartJson)
    this.cartSubjet.next(this.cart)
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart')
    return cartJson? JSON.parse(cartJson): new Cart()
  }
}
