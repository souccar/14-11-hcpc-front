import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan.component';
// import { ViewPlanDialogComponent } from './view-plan/view-plan-dialog.component';
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
