import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  toggleValue: boolean = false
  frequency: string = ''

  constructor(private service: NotificationService) {}

  ngOnInit(): void {
    this.service.getServiceWorkingState().subscribe((result) => this.toggleValue = result)
    this.service.getCheckingDelay().subscribe((result) => this.frequency = result.toString())
  }

  public changeUpdateFrequency() {
    this.service.changeCheckingDelay(parseInt(this.frequency, 10)).subscribe((result) => this.frequency = result.toString())
  }

  public setWorkingState() {
    this.service.changeServiceWorkingState().subscribe((result) => this.toggleValue = result)
  }
}
