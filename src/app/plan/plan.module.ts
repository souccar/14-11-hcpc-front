import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './plan.component';
import { PlanRoutingModule } from './plan-routing.module';
import { CreatePlanDialogComponent } from './create-plan/create-plan-dialog.component';
import { CreatePlanProductDialogComponent } from './create-plan-product/create-plan-product-dialog.component';
import { EditPlanDialogComponent } from './edit-plan/edit-plan-dialog.component';
import { ViewPlanDialogComponent } from './view-plan/view-plan-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EditPlanProductDialogComponent } from './edit-plan-product/edit-plan-product-dialog.component';




@NgModule({
  declarations: [
    PlanComponent,
    CreatePlanDialogComponent,
    EditPlanDialogComponent,
    ViewPlanDialogComponent,
    CreatePlanProductDialogComponent,
    EditPlanProductDialogComponent
 
  ],
  imports: [
  
    PlanRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    PaginationModule.forRoot(),
    CommonModule,
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class PlanModule { }
