import { Component, OnInit } from '@angular/core';
import { Message } from './support.model';
import { SupportService } from './support.service';
import { UiService } from '../ui/ui.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  filteredMessages: Message[] = []
  areMessagesShown: boolean = false
  messageFilterClass = MessageFilter

  constructor(private supportService: SupportService, private uiService: UiService, private authService: AuthService) {

  }
  ngOnInit(): void {
  }

  setFilteredMessages(filterString: string): void {
    let filter: MessageFilter = MessageFilter[filterString as keyof typeof MessageFilter]
    this.areMessagesShown = true
    if (filter === MessageFilter.Processed) {
      this.supportService.getProcessedMessages().subscribe(
        {
          next: (value) => {
            this.filteredMessages = value
            this.uiService.showPopUpWindow("Успешно")
          },
          error: (e) => this.showErrorMessageAndLogout("Ошибка", e)
        }
      )
    } else if (filter === MessageFilter.Unprocessed) {
      this.supportService.getUnprocessedMessages().subscribe(
        {
          next: (value) => {
            this.filteredMessages = value
            this.uiService.showPopUpWindow("Успешно")
          },
          error: (e) => this.showErrorMessageAndLogout("Ошибка", e)
        }
      )
    } else {
      this.supportService.getAllMessages().subscribe(
        {
          next: (value) => {
            this.filteredMessages = value
            this.uiService.showPopUpWindow("Успешно")
          },
          error: (e) => this.showErrorMessageAndLogout("Ошибка", e)
        }
      )
    }
  }

  changeMessageVisibility() {
    this.areMessagesShown = false
  }

  get filterOptions(): string[] {
    return Object.keys(MessageFilter).map(key => MessageFilter[key as keyof typeof MessageFilter]);
  }

  showErrorMessageAndLogout(message: string, error: any) {
    this.uiService.showPopUpWindow(message)
    if (error.status == 401) {
      this.authService.logout()
    }
  }

}

enum MessageFilter {
  All = 'All',
  Processed = 'Processed',
  Unprocessed = 'Unprocessed'
}