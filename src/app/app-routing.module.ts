import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotificationComponent} from './notification/notification.component';
import {SupportComponent} from './support/support.component';
import {CoreComponent} from './core/core.component';

const routes: Routes = [
  {path: 'notification', component: NotificationComponent},
  {path: 'support', component: SupportComponent},
  {path: 'core', component: CoreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
