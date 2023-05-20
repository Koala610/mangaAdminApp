import { Injectable } from '@angular/core';
import {Observable, firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { User } from './core.model';
import { LoginDataService } from '../login-data.service';
import { Admin } from '../auth/models';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  BASE_URL = "http://localhost:8080"

  constructor(private client: HttpClient, private loginDataService: LoginDataService) { }

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

  async changeUserId(userId: string) {
    let admin: Admin =  await firstValueFrom(this.loginDataService.currentAdmin)
      return this.client.post<object>(`${this.BASE_URL}/admin/user_id`, {
          "id": admin.id,
          "user_id": userId
      }).subscribe(
        {
          next: (v) => { 
            admin.user_id = userId
            this.loginDataService.changeAdmin(admin)
          },
          error: (e) => console.log(e)
        }
      )
  }
  
}
