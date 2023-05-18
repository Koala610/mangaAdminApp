import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  BASE_URL = "http://localhost:8080"

  constructor(private client: HttpClient) { }

  sendBroadcastMessage(message: String) {
    this.client.post<object>(`${this.BASE_URL}/notify/all/`, {
            "data": {
              "message": message
            }
        }).subscribe();
  }
  
}
