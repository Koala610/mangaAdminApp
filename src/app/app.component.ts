import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  TOKEN_IDENTIFIER: string = "token";
  title: string = 'manga-admin-app';
  isLogged: boolean = false;
  username: string = "";
  password: string = "";

  ngOnInit(): void {
    const token: String | null = localStorage.getItem(this.TOKEN_IDENTIFIER);
    if (token) {
      this.isLogged = true;
    }
  }

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe((data) => {
      localStorage.setItem(this.TOKEN_IDENTIFIER, data.access_token);

      this.isLogged = true
      this.username = ""
      this.password = ""
    })
  }

  logout() {
    this.isLogged = false
    localStorage.removeItem(this.TOKEN_IDENTIFIER)
  }
}
