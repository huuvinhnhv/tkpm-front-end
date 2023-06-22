import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: string = '';
  storage: Storage = sessionStorage;
  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.authService.authStatusListener();
    this.authService.currentAuthStatus.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
      this.userName = authStatus.email;
      this.storage.setItem('userEmail', JSON.stringify(authStatus.email));
    });
  }
}
