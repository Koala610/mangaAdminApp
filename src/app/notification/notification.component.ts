import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { UiService } from '../ui/ui.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  toggleValue: boolean = false
  frequency: string = ''

  constructor(private service: NotificationService, private uiService: UiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.service.getServiceWorkingState().subscribe((result) => this.toggleValue = result,
      (error) => this.showErrorMessageAndLogout("Ошибка при получении статуса сервиса", error)
    )
    this.service.getCheckingDelay().subscribe((result) => this.frequency = result.toString(),
      (error) => this.showErrorMessageAndLogout("Ошибка при получении частоты", error)
    )
  }

  public changeUpdateFrequency() {
    this.service.changeCheckingDelay(parseInt(this.frequency, 10)).subscribe((result) => { 
        this.frequency = result.toString()
        this.uiService.showPopUpWindow("Успех")
      },
      (error) => this.showErrorMessageAndLogout("Ошибка", error)
    )
  }

  public setWorkingState() {
    this.service.changeServiceWorkingState().subscribe((result) => 
      { 
        this.toggleValue = result
        this.uiService.showPopUpWindow("Успех")
      },
      (error) => this.showErrorMessageAndLogout("Ошибка", error)
    )
  }

  showErrorMessageAndLogout(message: string, error: any) {
    this.uiService.showPopUpWindow(message)
    if (error.status == 401) {
      this.authService.logout()
    }
  }
}
