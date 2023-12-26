import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelComponent } from './personnel.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [
  { path: '', component: PersonnelComponent, children: [
    {
      path: 'employee',
      component: EmployeeComponent,
      canActivate: [AppRouteGuard]
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
