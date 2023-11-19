import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseComponent } from './warehouse.component';
import { WarehouseMaterialModule } from './warehouse-material/warehouse-material.module';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { InputRequestComponent } from './input-request/input-request.component';

@NgModule({
  declarations: [
    WarehouseComponent,
    InputRequestComponent,
    
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
    WarehouseMaterialModule
    
  ]
})
export class WarehouseModule { }
