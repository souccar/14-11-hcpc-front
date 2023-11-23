import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
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
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { LogsComponent } from '@app/dashboards/logs/logs.component';
import { LastLoginsComponent } from '@app/dashboards/last-logins/last-logins.component';




@NgModule({
  declarations: [
    PlanComponent,
    CreatePlanDialogComponent,
    EditPlanDialogComponent,
    ViewPlanDialogComponent,
    CreatePlanProductDialogComponent,
    EditPlanProductDialogComponent,
    ViewPlanComponent,
    LogsComponent,
    LastLoginsComponent
 
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
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class PlanModule { }
