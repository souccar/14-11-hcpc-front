import { ViewPlanComponent } from './plan/view-plan/view-plan.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { PlanComponent } from './plan/plan.component';
import { ViewActuallyComponent } from './actually/view-actually/view-actually.component';
import { ActuallyComponent } from './actually/actually.component';




const routes: Routes = [{
  path: '', component: ProductionComponent ,
  children:[
    {
      path: 'plan', component: ViewPlanComponent,
      canActivate: [AppRouteGuard]
    },
    {
      path: 'displayAllPlan',
      component: PlanComponent,
      canActivate: [AppRouteGuard]
    },

    {
      path: 'diallyProduction',
      component: ViewActuallyComponent,
      canActivate: [AppRouteGuard]
    },
    {
      path: 'diallyProduction/list',
      component: ActuallyComponent,
      canActivate: [AppRouteGuard]
    },


  ]
}];

@NgModule({
imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class ProductionRoutingModule { }
