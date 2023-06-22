import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private orderUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) {}
  getOrderHistory(
    theEmail: string,
    thePage: number = 1,
    theSize: number = 20
  ): Observable<GetResonseOrderHistoryResponse> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}&page=${thePage}&size=${theSize}`;
    return this.httpClient.get<GetResonseOrderHistoryResponse>(orderHistoryUrl);
  }
}

interface GetResonseOrderHistoryResponse {
  _embedded: {
    orders: OrderHistory[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
