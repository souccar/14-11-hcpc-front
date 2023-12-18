import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { RoleComponent } from './role/role.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { CreateRoleComponent } from './role/create-role/create-role.component';



const routes: Routes = [{
  path: '', component: SecurityComponent,
  children: [
    {
      path: 'role',
      component: RoleComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard],
    },
    {
      path: 'newRole',
      component: CreateRoleComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
