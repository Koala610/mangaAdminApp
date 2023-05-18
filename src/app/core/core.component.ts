import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CoreService } from './core.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent {

  formData = {
    message: ''
  };
  constructor(private http: HttpClient, private coreService: CoreService) {}

  submitForm() {
    // Send the form data to the remote server
    this.coreService.sendBroadcastMessage(this.formData.message)
  }
}
