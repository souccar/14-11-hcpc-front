import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './plan.component';
import { PlanRoutingModule } from './plan-routing.module';
import { CreatePlanDialogComponent } from './create-plan/create-plan-dialog.component';
import { CreatePlanProductDialogComponent } from './create-plan-product/create-plan-product-dialog.component';
import { EditPlanDialogComponent } from './edit-plan/edit-plan-dialog.component';
import { PlanProductComponent } from './view-plan/plan-product/plan-product.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EditPlanProductDialogComponent } from './edit-plan-product/edit-plan-product-dialog.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { ChartsModule } from '@app/@components/charts/charts.module';
import { PlanMaterialComponent } from './view-plan/plan-material/plan-material.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PlanProductsPercentageComponent } from './view-plan/plan-products/plan-products-percentage.component';
import { LogsComponent } from './view-plan/logs/logs.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LastLoginsComponent } from './view-plan/last-logins/last-logins.component';

@NgModule({
  declarations: [
    PlanComponent,
    CreatePlanDialogComponent,
    EditPlanDialogComponent,
    PlanProductComponent,
    CreatePlanProductDialogComponent,
    EditPlanProductDialogComponent,
    ViewPlanComponent,
    PlanMaterialComponent,
    PlanProductsPercentageComponent,
    LogsComponent,
    LastLoginsComponent,
 
  ],
  imports: [
  
    PlanRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    PaginationModule.forRoot(),
    BsDropdownModule,
    CommonModule,
    ChartsModule,
    PerfectScrollbarModule,
    
    
  
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class PlanModule { }
