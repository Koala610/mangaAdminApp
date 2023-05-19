import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { UiService } from '../ui/ui.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  toggleValue: boolean = false
  frequency: string = ''

  constructor(private service: NotificationService, private uiService: UiService) {}

  ngOnInit(): void {
    this.service.getServiceWorkingState().subscribe((result) => this.toggleValue = result,
      (error) => this.uiService.showPopUpWindow("Ошибка при получении статуса сервиса")
    )
    this.service.getCheckingDelay().subscribe((result) => this.frequency = result.toString(),
      (error) => this.uiService.showPopUpWindow("Ошибка при получении частоты")
    )
  }

  public changeUpdateFrequency() {
    this.service.changeCheckingDelay(parseInt(this.frequency, 10)).subscribe((result) => { 
        this.frequency = result.toString()
        this.uiService.showPopUpWindow("Успех")
      },
      (error) => this.uiService.showPopUpWindow("Ошибка")
    )
  }

  public setWorkingState() {
    this.service.changeServiceWorkingState().subscribe((result) => 
      { 
        this.toggleValue = result
        this.uiService.showPopUpWindow("Успех")
      },
      (error) => this.uiService.showPopUpWindow("Ошибка")
    )

  }
}
