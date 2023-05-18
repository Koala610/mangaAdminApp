import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { User } from './core.model';
import { CoreService } from './core.service';

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
  pageSize: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private coreService: CoreService, private snackBar: MatSnackBar, private authService: AuthService) {}

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.updateDisplayedUsers();
    this.generatePageNumbers();
  }

  submitForm(): void {
    this.coreService.sendBroadcastMessage(this.formData.message).subscribe(
      (response) => this.showPopUpWindow("Успех"),
      (error) => {
        if (error.status == 401) {
          this.showPopUpWindow("Ошибка")
          this.authService.logout()
        }
      }
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
    })
  }

  sendMessage(user_id: number): void {
    let message: string | null = prompt("Введите сообщение")
    if (message === null) {
      this.snackBar.open('Ошибка', 'Close', {
        duration: 5000,
      });
      return
    }
    this.coreService.sendMessage(user_id, message).subscribe(
      (response) => this.showPopUpWindow("Успех"),
      (error) => this.showPopUpWindow("Ошибка")
    )
  }

  private generatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  private showPopUpWindow(message: string, duration: number = 5000) {
      this.snackBar.open(message, 'Close', {
        duration: duration,
      });
  }
}
