import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesComponent } from './warehouses.component';
import { WarehouseMaterialModule } from './warehouse-material/warehouse-material.module';
import { WarehouseRoutingModule } from './warehouses-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { InputRequestComponent } from './input-request/input-request.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { CreateWarehouseDialogComponent } from './warehouse/create-warehouse/create-warehouse-dialog.component';
import { EditWarehouseDialogComponent } from './warehouse/edit-warehouse/edit-warehouse-dialog.component';
import { OutputRequestComponent } from './output-request/output-request.component';
import { CreateOutputRequestDialogComponent } from './output-request/create-output-request/create-output-request-dialog.component';
import { EditOutputRequestDialogComponent } from './output-request/edit-output-request/edit-output-request-dialog.component';
import { CreateOutputRequestMaterialDialogComponent } from './output-request-materials/create-output-request-materials/create-output-request-material-dialog.component';
import { EditOutputRequestMaterialDialogComponent } from './output-request-materials/edit-output-request-materials/edit-output-request-material-dialog.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ViewOutputRequestDialogComponent } from './output-request/view-output-request/view-output-request-dialog.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    WarehousesComponent,
    InputRequestComponent,
    WarehouseComponent,
    CreateWarehouseDialogComponent,
    EditWarehouseDialogComponent,
    OutputRequestComponent,
    CreateOutputRequestDialogComponent,
    EditOutputRequestDialogComponent,
    CreateOutputRequestMaterialDialogComponent,
    EditOutputRequestMaterialDialogComponent,
    ViewOutputRequestDialogComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LayoutModule,
    BsDatepickerModule,
    NgSelectModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    WarehouseRoutingModule,
    WarehouseMaterialModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    
  ],

  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class WarehousesModule { }
