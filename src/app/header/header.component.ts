import { Component, OnInit } from '@angular/core';
import { LoginDataService } from '../login-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLogged: boolean = false

  constructor(private loginDataService: LoginDataService) {}

  ngOnInit(): void {
    this.loginDataService.currentStatus.subscribe(value => {
      this.isLogged = value
    });
  }

  logout() {
    this.loginDataService.changeStatus(false)
  }
}
