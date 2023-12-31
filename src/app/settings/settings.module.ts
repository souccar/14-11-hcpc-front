import { ProductComponent } from './product/product.component';
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
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { CreateGeneralSettingDialogComponent } from './general-setting/create-general-setting/create-general-setting-dialog.component';
import { EditGeneralSettingDialogComponent } from './general-setting/edit-general-setting/edit-general-setting-dialog.component';
import { CreateProductDialogComponent } from './product/create-product/create-product-dialog.component';
import { EditProductDialogComponent } from './product/edit-product/edit-product-dialog.component';
import { ViewProductDialogComponent } from './product/view-product/view-product-dialog.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MaterialComponent } from './material/material.component';
import { CreateMaterialDialogComponent } from './material/create-material/create-material-dialog.component';
import { EditMaterialDialogComponent } from './material/edit-material/edit-material-dialog.component';
import { ViewMaterialDialogComponent } from './material/view-material/view-material-dialog.component';
import { FormulaComponent } from './formula/formula.component';
import { CreateFormulaDialogComponent } from './formula/create-formula/create-formula-dialog.component';
import { EditFormulaDialogComponent } from './formula/edit-formula/edit-formula-dialog.component';
import { ViewFormulaDialogComponent } from './formula/view-formula/view-formula-dialog.component';
import { MaterialDetailsComponent } from './material/material-details/material-details.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CreateSupplierDialogComponent } from './supplier/create-supplier/create-supplier-dialog.component';
import { EditSupplierDialogComponent } from './supplier/edit-supplier/edit-supplier-dialog.component';
import { ViewSupplierDialogComponent } from './supplier/view-supplier/view-supplier-dialog.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
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
    ProductComponent,
    CreateProductDialogComponent,
    EditProductDialogComponent,
    ViewProductDialogComponent,
    CreateTransferDialogComponent,
    GeneralSettingComponent,
    CreateGeneralSettingDialogComponent,
    EditGeneralSettingDialogComponent,
    MaterialComponent,
    CreateMaterialDialogComponent,
    EditMaterialDialogComponent,
    ViewMaterialDialogComponent,
    FormulaComponent,
    CreateFormulaDialogComponent,
    EditFormulaDialogComponent,
    ViewFormulaDialogComponent,
    MaterialDetailsComponent,
    SupplierComponent,
    CreateSupplierDialogComponent,
    EditSupplierDialogComponent,
    ViewSupplierDialogComponent

  ],
  imports: [
    AccordionModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    CommonModule,
    SettingsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
