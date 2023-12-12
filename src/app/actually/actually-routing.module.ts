import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewActuallyComponent } from './view-actually/view-actually.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { ActuallyComponent } from './actually.component';
import { ActualDetailDialogComponent } from './view-actually/actual-detail-dialog/actual-detail-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ViewActuallyComponent,
    canActivate: [AppRouteGuard]
  },
  {
    path: 'list',
    component: ActuallyComponent,
    canActivate: [AppRouteGuard]
  },
  {
    path: 'request/:id',
    component: ActualDetailDialogComponent,
    canActivate: [AppRouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActuallyRoutingModule { }
