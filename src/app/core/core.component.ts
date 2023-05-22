import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { User } from './core.model';
import { CoreService } from './core.service';
import { UiService } from '../ui/ui.service';
import { Admin } from '../auth/models';
import { LoginDataService } from '../login-data.service';
import { SupportService } from '../support/support.service';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  formData = { message: '' };
  isUserListVisible: boolean = false
  users: User[] = [];
  displayedUsers: User[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
  // admin?: Admin

  constructor(
    private coreService: CoreService,
    private uiService: UiService,
    private authService: AuthService,
    private supportService: SupportService,
    public loginDataService: LoginDataService
  ) { }

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

  async updateDisplayedUsers() {
    const startIndex: number = (this.currentPage - 1) * this.pageSize;
    this.coreService.getUsersInRange(startIndex, this.pageSize).subscribe((users) => {
      users.map(async (user) => {
        user.is_support = await firstValueFrom(this.coreService.checkIfUserIsSupport(user.id))
        return user
      })
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

  makeSupport(userId: number) {
    this.supportService.makeSupport(userId).subscribe({
      next: (v) => this.uiService.showPopUpWindow("Успех"),
      error: (e) => this.uiService.showPopUpWindow("Ошибка")
    })
  }

  async changeUserId() {
    let userId = prompt("Enter User ID")
    if (userId === undefined || userId === null || userId === "") {
      return
    }
    this.coreService.changeUserId(userId)
    this.authService.setAdminEntities(parseInt(userId))
  }

  getValueFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem("admin") || "")
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
function firstValueFor(arg0: Observable<boolean>) {
  throw new Error('Function not implemented.');
}

