import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan.component';
import { ViewPlanDialogComponent } from './view-plan/view-plan-dialog.component';



const routes: Routes = [{ 
  path: '', component: ViewPlanDialogComponent ,
  children:[
   
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
