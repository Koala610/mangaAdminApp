import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin, AuthData} from './models'
import { LoginDataService } from '../login-data.service';
import { Support } from '../support/support.model';
import { SupportService } from '../support/support.service';
import { User } from '../core/core.model';
import { enviroment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: String = enviroment.coreServiceUrl
  SUPPORT_URL: string = enviroment.supportServiceUrl
  TOKEN_IDENTIFIER: string = "token";

  constructor(
    private client: HttpClient,
    private loginDataService: LoginDataService
  ) { }

  login(username: String, password: String) {
    this.client.post<AuthData>(`${this.BASE_URL}/login`, {
          "username": username,
          "password": password
        }).subscribe((item) => {
          localStorage.setItem(this.TOKEN_IDENTIFIER, item.access_token);
          this.loginDataService.changeStatus(true);
          this.client.get<Admin>(`${this.BASE_URL}/admin`).subscribe(
            {
              next: (v) => { 
                this.loginDataService.changeAdmin(v);
                localStorage.setItem("admin", JSON.stringify(v))
                this.setAdminEntities(parseInt(v.user_id || ""))
              }
            }
          )
        });
  }

  logout() {
    this.loginDataService.changeStatus(false)
    localStorage.removeItem(this.TOKEN_IDENTIFIER)
    localStorage.removeItem("admin")
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

  setAdminEntities(userId: number) {
    this.client.get<Support>(`${this.SUPPORT_URL}/support/get?user_id=${userId}`)
.subscribe({
      next: (v2) => localStorage.setItem("support", JSON.stringify(v2))
    })
    this.client.get<User>(`${this.BASE_URL}/user/${userId}`).subscribe({
      next: (v) => localStorage.setItem("user", JSON.stringify(v))
    })
  }
}
