import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin, AuthData} from './models'
import { LoginDataService } from '../login-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: String = "http://localhost:8080"
  TOKEN_IDENTIFIER: string = "token";

  constructor(private client: HttpClient, private loginDataService: LoginDataService) { }

  login(username: String, password: String) {
    this.client.post<AuthData>(`${this.BASE_URL}/login`, {
          "username": username,
          "password": password
        }).subscribe((item) => {
          localStorage.setItem(this.TOKEN_IDENTIFIER, item.access_token);
          this.loginDataService.changeStatus(true);
          this.client.get<Admin>(`${this.BASE_URL}/admin`).subscribe(
            {
              next: (v) => this.loginDataService.changeAdmin(v)
            }
          )
        });
  }

  logout() {
    this.loginDataService.changeStatus(false)
    localStorage.removeItem(this.TOKEN_IDENTIFIER)
  }

  echo() {
    console.log("Sending request to Core service...")
    this.client.get(`${this.BASE_URL}/echo`).subscribe(
      {
        next: (v) => console.log("Core service in normal state"),
        error: (e) => {
          if (e.status == 401) {
            console.log("Authentication error")
            this.logout()
          }
        }
      }
    )
  }
}
