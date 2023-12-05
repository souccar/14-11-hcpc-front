import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { CreateSupplierDialogComponent } from './create-supplier/create-supplier-dialog.component';
import { EditSupplierDialogComponent } from './edit-supplier/edit-supplier-dialog.component';
import { ViewSupplierDialogComponent } from './view-supplier/view-supplier-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { SupplierRoutingModule } from './supplier-routing.module';

@NgModule({
  declarations: [
    SupplierComponent,
    CreateSupplierDialogComponent,
    EditSupplierDialogComponent,
    ViewSupplierDialogComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // SupplierRoutingModule,
    LayoutModule,
    PaginationModule.forRoot(),
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierModule { }
