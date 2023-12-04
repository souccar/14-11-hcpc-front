import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan.component';
// import { PlanProductComponent } from './view-plan/plan-product.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { DailyProductionComponent } from './daily-Production/daily-production.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';



const routes: Routes = [
  {
    path: '', component: ViewPlanComponent,
    canActivate: [AppRouteGuard]
  },
  {
    path: 'dailyproduction/:id',
    component: DailyProductionComponent,
    canActivate: [AppRouteGuard]
  },
  {
    path: 'displayAllPlan',
    component: PlanComponent,
    canActivate: [AppRouteGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
