import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { UnitComponent } from './unit/unit.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { CreateUnitDialogComponent } from './unit/create-unit/create-unit-dialog.component';
import { EditUnitDialogComponent } from './unit/edit-unit/edit-unit-dialog.component';
import { ViewUnitDialogComponent } from './unit/view-unit/view-unit-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TransferComponent } from './Transfer/transfer.component';
import { ViewTransferDialogComponent } from './Transfer/view-transfer/view-transfer-dialog.component';
import { EditTransferDialogComponent } from './Transfer/edit-transfer/edit-transfer-dialog.component';
import { CreateTransferDialogComponent } from './Transfer/create-transfer/create-transfer-dialog.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UnitComponent,
    CreateUnitDialogComponent,
    EditUnitDialogComponent,
    ViewUnitDialogComponent,
    TransferComponent,
    ViewTransferDialogComponent,
    EditTransferDialogComponent,
    CreateTransferDialogComponent,
    
  ],
  imports: [
   
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    PaginationModule.forRoot(),
  CommonModule,
  SettingsRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
