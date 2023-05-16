import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './models'
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
        });
  }

  logout() {
    this.loginDataService.changeStatus(false)
    localStorage.removeItem(this.TOKEN_IDENTIFIER)
  }
}
