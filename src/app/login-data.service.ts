import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  private statusSource = new BehaviorSubject<boolean>(false);
  currentStatus = this.statusSource.asObservable();

  constructor() { }

  changeStatus(status:boolean){
    this.statusSource.next(status)
  }
}
