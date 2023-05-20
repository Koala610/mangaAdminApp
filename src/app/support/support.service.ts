import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UiService } from '../ui/ui.service';
import { Message } from './support.model';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  BASE_URL = "http://localhost:8082"

  constructor(private client: HttpClient, private authService: AuthService, private uiService: UiService) {}

  getAllMessages() {
    return this.client.get<Message[]>(`${this.BASE_URL}/message`)
  }  

  getProcessedMessages() {
    return this.client.get<Message[]>(`${this.BASE_URL}/message/processed`)
  }  

  getUnprocessedMessages() {
    return this.client.get<Message[]>(`${this.BASE_URL}/message/unprocessed`)
  }  
}
