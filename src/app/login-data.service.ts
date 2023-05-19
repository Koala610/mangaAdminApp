import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Admin } from './auth/models';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  private statusSource = new BehaviorSubject<boolean>(false);
  private adminSource = new BehaviorSubject<Admin>({user_id: null, username: ""});
  currentStatus = this.statusSource.asObservable();
  currentAdmin = this.adminSource.asObservable();

  constructor() { }

  changeStatus(status:boolean){
    this.statusSource.next(status)
  }

  changeAdmin(admin: Admin) {
    this.adminSource.next(admin)
  }
}
