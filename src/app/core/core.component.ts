import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { User } from './core.model';
import { CoreService } from './core.service';
import { UiService } from '../ui/ui.service';
import { Admin } from '../auth/models';
import { LoginDataService } from '../login-data.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  formData = { message: '' };
  isUserListVisible: boolean = false
  users: User[] = [];
  displayedUsers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
  // admin?: Admin

  constructor(
    private coreService: CoreService,
    private uiService: UiService,
    private authService: AuthService,
    public loginDataService: LoginDataService
  ) {  }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.updateDisplayedUsers();
    this.generatePageNumbers();
  }

  submitForm(): void {
    this.coreService.sendBroadcastMessage(this.formData.message).subscribe(
      (response) => this.uiService.showPopUpWindow("Успех"),
      (error) => this.showErrorMessageAndLogout("Ошибка", error)
    )
  }

  showUserList(): void {
    this.isUserListVisible = !this.isUserListVisible
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedUsers();
    }
  }

  updateDisplayedUsers(): void {
    const startIndex: number = (this.currentPage - 1) * this.pageSize;
    this.coreService.getUsersInRange(startIndex, this.pageSize).subscribe((users) => {
      this.displayedUsers = users
    },
      (error) => this.showErrorMessageAndLogout("Ошибка", error)
    )
  }

  sendMessage(user_id: number): void {
    let message: string | null = prompt("Введите сообщение")
    if (message === null) {
      this.uiService.showPopUpWindow("Ошибка")
      return
    }
    this.coreService.sendMessage(user_id, message).subscribe(
      (response) => this.uiService.showPopUpWindow("Успех"),
      (error) => this.showErrorMessageAndLogout("Ошибка", error)
    )
  }

  changeUserId() {
    let userId = prompt("Enter User ID")
    if (userId === undefined || userId === null || userId === "") {
      return
    }
    this.coreService.changeUserId(userId)
  }

  private generatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  private showErrorMessageAndLogout(message: string, error: any) {
    this.uiService.showPopUpWindow(message)
    if (error.status == 401) {
      this.authService.logout()
    }
  }
}
