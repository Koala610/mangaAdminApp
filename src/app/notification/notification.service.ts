import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  BASE_URL = 'http://localhost:8081'

  constructor(private client: HttpClient) { }

  changeServiceWorkingState(): Observable<boolean> {
    return this.client.get<boolean>(`${this.BASE_URL}/notification/service/working_state`)
  }

  getServiceWorkingState(): Observable<boolean> {
    return this.client.get<boolean>(`${this.BASE_URL}/notification/service/working_state?change=0`)
  }

  changeCheckingDelay(delay: number): Observable<number> {
    return this.client.get<number>(`${this.BASE_URL}/notification/service?update_frequency=${delay}`)
  }

  getCheckingDelay(): Observable<number> {
    return this.client.get<number>(`${this.BASE_URL}/notification/service?change=0`)
  }
}
