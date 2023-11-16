import { SupplierComponent } from './supplier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [{
  path: '', component: SupplierComponent ,
  children:[
    {
      path: 'supplier',
      component: SupplierComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },






  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
