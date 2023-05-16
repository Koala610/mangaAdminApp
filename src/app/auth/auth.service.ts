import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './models'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL: String = "http://localhost:8080"

  constructor(private client: HttpClient) { }

  login(username: String, password: String): Observable<AuthData> {
    return this.client.post<AuthData>(`${this.BASE_URL}/login`, {
      "username": username,
      "password": password
    });
  }
}
