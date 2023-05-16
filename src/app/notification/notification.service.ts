import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  BASE_URL = 'http://localhost:8081'

  constructor(private client: HttpClient) { }

  changeServiceWorkingState(): Observable<String> {
    return this.client.get<String>(`${this.BASE_URL}/notification/service/workingState`)
  }

  changeCheckingDelay(delay: number): Observable<String> {
    return this.client.get<String>(`${this.BASE_URL}/notification/service?${delay}`)
  }
}
