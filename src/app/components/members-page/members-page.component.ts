import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css'],
})
export class MembersPageComponent implements OnInit {
  listVouchers: any = [];
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getAllVouchers();
  }
  getAllVouchers() {
    const userFromDatabase = localStorage.getItem('userFromDatabase');
    if (userFromDatabase) {
      const user = JSON.parse(userFromDatabase);
      // console.log(user);
      const uri = `http://localhost:8080/api/voucher/findByCustomer/${user.id}`;
      this.httpClient.get<any>(uri).subscribe((vouchers) => {
        for (let i = 0; i < vouchers.length; i++) {
          vouchers[i].index = i + 1;
        }
        this.listVouchers = vouchers;
        localStorage.setItem('vouchersList', JSON.stringify(vouchers));
      });
    }
  }
}
