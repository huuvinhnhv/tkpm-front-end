import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderHistory } from 'src/app/common/order-history';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  orderDetail: OrderHistory | undefined;
  storage: Storage = sessionStorage;
  shippingAddress: string = '';
  billingAddress: string = '';
  orderItems: any = [];
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.handelOrderHistory();
  }
  handelOrderHistory() {
    this.http
      .get<any>('http://localhost:8080/api/orders/' + this.data.id)
      .subscribe((data) => {
        console.log(data);
        this.orderDetail = data;
        this.orderItems = data.orderItems;
        this.shippingAddress =
          data.shippingAddress.street +
          ', ' +
          data.shippingAddress.city +
          ', ' +
          data.shippingAddress.state +
          ', ' +
          data.shippingAddress.country +
          '.';
        this.billingAddress =
          data.billingAddress.street +
          ', ' +
          data.billingAddress.city +
          ', ' +
          data.billingAddress.state +
          ', ' +
          data.billingAddress.country +
          '.';
      });
  }
}
