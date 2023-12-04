import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { MaterialComponent } from './material/material.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { ProductComponent } from './product/product.component';
import { FormulaComponent } from './formula/formula.component';


const routes: Routes = [{
  path: '', component: ProductionComponent ,
  children:[
    {
      path: 'material',
      component: MaterialComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'product',
      component: ProductComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'formula/:id',
      component: FormulaComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
