import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseMaterialComponent } from './warehouse-material.component';

import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CreateWarehouseMaterialDialogComponent } from './create-warehouse-Material/create-warehouse-material-dialog.component';
import { ViewWarehouseMaterialDialogComponent } from './view-warehouse-Material/view-warehouse-Material-dialog.component';
import { EditWarehouseMaterialDialogComponent } from './edit-warehouse-Material/edit-warehouse-Material-dialog.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    WarehouseMaterialComponent,
   ViewWarehouseMaterialDialogComponent,
   EditWarehouseMaterialDialogComponent,
    CreateWarehouseMaterialDialogComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule,

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class WarehouseMaterialModule { }
