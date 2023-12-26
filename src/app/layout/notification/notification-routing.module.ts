import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NotificationComponent} from './notification.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [{
  path: '', component: NotificationComponent ,
  children:[
    {
      path: 'notifications', component: NotificationComponent,
      canActivate: [AppRouteGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
