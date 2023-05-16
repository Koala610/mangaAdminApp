import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../login-data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(public loginDataService: LoginDataService, private authService: AuthService) {}

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }
}
