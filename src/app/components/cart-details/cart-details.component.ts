import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  discountPrice: number = 0;
  voucherInput: string = '';
  vouchers: any = [];
  tempPrice: number = 0;
  selectedVoucherId: string = '0';
  checkVoucherStatus: boolean = false;
  voucherSelected: any | undefined;
  constructor(
    private cartService: CartService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.getAllVouchers();
    this.listCartDetails();
    this.tempPrice = this.totalPrice;
  }
  applyVoucher() {
    localStorage.setItem('voucherSelectedId', this.selectedVoucherId);
    let voucher = this.vouchers.find(
      (data: any) => data.id == this.selectedVoucherId
    );
    if (voucher === undefined) {
      voucher = {
        value: 0,
      };
    }
    let discountPriceTemp = (this.totalPrice * Number(voucher.value)) / 100;
    this.discountPrice = parseFloat(discountPriceTemp.toFixed(4));
    this.cartService.computeCartTotals(this.discountPrice);
  }
  listCartDetails() {
    //get a handle to the cart item
    this.cartItems = this.cartService.cartItems;
    //subcribe to the cart totalPrice and totalQuantity
    this.cartService.totalPrice.subscribe((price: number) => {
      this.totalPrice = price;
    });
    this.cartService.totalQuantity.subscribe((quantity: number) => {
      this.totalQuantity = quantity;
    });
    this.cartService.computeCartTotals();
    //compute cart total price and quantity
  }
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
    this.tempPrice = this.totalPrice;
  }
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem); //
    this.tempPrice = this.totalPrice;
  }
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
    this.tempPrice = this.totalPrice;
  }
  getAllVouchers() {
    const userFromDatabase = localStorage.getItem('userFromDatabase');
    if (userFromDatabase) {
      const user = JSON.parse(userFromDatabase);
      // console.log(user);
      const uri = `http://localhost:8080/api/voucher/findByCustomer/${user.id}`;
      this.httpClient.get<any>(uri).subscribe((vouchers) => {
        for (let i = 0; i < vouchers.length; i++) {
          if (vouchers[i].status === false) {
            this.vouchers.push(vouchers[i]);
          }
        }
      });
    }
  }
}
