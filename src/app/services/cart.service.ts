import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = sessionStorage;
  constructor() {
    let cartItems = this.storage.getItem('cartItems');
    let data: any = cartItems !== null ? JSON.parse(cartItems) : null;

    if (data != null) {
      this.cartItems = data;
      this.computeCartTotals();
    }
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(cartItem: CartItem) {
    //check if we already have a cart item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;
    if (this.cartItems.length > 0) {
      //find the item in the cart based in item id
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === cartItem.id
      );
      //check if we found it
      alreadyExistsInCart = existingCartItem !== undefined;
    }
    if (alreadyExistsInCart) {
      if (existingCartItem?.quantity) {
        existingCartItem.quantity++;
      }
    } else {
      this.cartItems.push(cartItem);
    }
    //compute cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals(discountPrice: number = 0) {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      if (currentCartItem?.quantity && currentCartItem?.unitPrice) {
        totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
        totalQuantityValue += currentCartItem.quantity;
      }
    }
    //pulish the new values ... all subcribers will receive the new data
    totalPriceValue = totalPriceValue - discountPrice;
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.persistCartItems();
  }
  decrementQuantity(theCartItem: CartItem) {
    if (theCartItem.quantity) {
      theCartItem.quantity--;
    }
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
