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

@NgModule({
  declarations: [
    WarehousesComponent,
    InputRequestComponent,
    WarehouseComponent,
    CreateWarehouseDialogComponent,
    EditWarehouseDialogComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    PaginationModule.forRoot(),
    CommonModule,
    WarehouseRoutingModule,
    WarehouseMaterialModule,
  
    
  ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class WarehousesModule { }
