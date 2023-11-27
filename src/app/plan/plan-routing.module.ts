import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan.component';
// import { PlanProductComponent } from './view-plan/plan-product.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';



const routes: Routes = [{ 
  path: '', component: ViewPlanComponent ,
  children:[
   
  ]
},
{path: 'displayAllPlan', component: PlanComponent} ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
