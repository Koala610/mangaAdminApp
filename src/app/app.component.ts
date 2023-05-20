import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoginDataService } from './login-data.service';
import { Observable, map, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'manga-admin-app';
  isLogged: boolean = false;
  username: string = "";
  password: string = "";
  getCurrentLoginState: Observable<boolean> = this.loginDataService.currentStatus.pipe()

  ngOnInit(): void {
    const token: String | null = localStorage.getItem(this.authService.TOKEN_IDENTIFIER);
    if (token) {
      this.loginDataService.changeStatus(true)
    }
    timer(0, 300000).subscribe(() => this.authService.echo())
  }

  constructor(private authService: AuthService, public loginDataService: LoginDataService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password);
    this.username = "";
    this.password = "";
    if (this.router.url === "/") {
      this.router.navigate(["/core"])
    }
  }

  logout() {
    this.authService.logout()
  }

}
