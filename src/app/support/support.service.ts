import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UiService } from '../ui/ui.service';
import { Message, Support } from './support.model';
import { enviroment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  BASE_URL = enviroment.supportServiceUrl
  CORE_URL = enviroment.coreServiceUrl

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

  makeSupport(userId: number) {
    return this.client.post<object>(`${this.BASE_URL}/support`, {
      "user_id": userId
    })
  }

  getSupportByUserId(userId: number) {
    return this.client.get<Support>(`${this.BASE_URL}/support?user_id=${userId}`)
  }

  answerMessage(messageId: number, supportId: number, response: string) {
    return this.client.post<object>(`${this.CORE_URL}/message/answer`, {
      "support_id": supportId,
      "message_id": messageId,
      "response": response
    })
  }
}
