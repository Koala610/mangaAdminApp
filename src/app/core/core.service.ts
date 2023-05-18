import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { User } from './core.model';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  BASE_URL = "http://localhost:8080"

  constructor(private client: HttpClient) { }

  sendBroadcastMessage(message: String) {
    return this.client.post<object>(`${this.BASE_URL}/notify/all/`, {
            "data": {
              "message": message
            }
        });
  }

  getUsersInRange(offset: number, limit: number) {
    return this.client.get<User[]>(`${this.BASE_URL}/user?offset=${offset}&limit=${limit}`)
  }

  sendMessage(user_id: number, message: String) {
    return this.client.post<object>(`${this.BASE_URL}/notify/${user_id}`, {
            "data": {
              "message": message
            }
        });
  }
  
}
