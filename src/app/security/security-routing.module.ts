import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { RoleComponent } from './role/role.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { UserComponent } from './user/user.component';



const routes: Routes = [{
  path: '', component: SecurityComponent,
  children: [
    {
      path: 'user',
      component: UserComponent,
      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard],
    },
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
    },
    {
      path: 'editRole/:id',
      component: EditRoleComponent,
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
