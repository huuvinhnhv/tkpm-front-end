import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: OrderHistory[] = [];
  storage: Storage = sessionStorage;
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  constructor(
    private orderHistoryService: OrderHistoryService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.handelOrderHistory();
  }
  handelOrderHistory() {
    let userEmail = this.storage.getItem('userEmail');
    let theEmail: any = userEmail !== null ? JSON.parse(userEmail) : null;
    this.orderHistoryService
      .getOrderHistory(theEmail, this.thePageNumber - 1, this.thePageSize)
      .subscribe((data) => {
        this.orderHistory = data._embedded.orders;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }
  openHostoryDetailDialog(id: string): void {
    const dialogConfig: MatDialogConfig = {
      width: '800px',
      height: '500px',

      position: {
        left: '50%',
        top: '20%',
      },
      panelClass: 'dialog-center',
      maxHeight: '100vh',
      maxWidth: '100vw',
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      data: { id: id },
    };
    this.dialog.open(OrderDetailComponent, dialogConfig);
  }
}
