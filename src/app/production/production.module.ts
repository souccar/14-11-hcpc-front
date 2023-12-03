import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { ProductionRoutingModule } from './production-routing.module';
import { MaterialComponent } from './material/material.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CreateMaterialDialogComponent } from './material/create-material/create-material-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMaterialDialogComponent } from './material/edit-material/edit-material-dialog.component';
import { ViewMaterialDialogComponent } from './material/view-material/view-material-dialog.component';
import { ProductComponent } from './product/product.component';
import { CreateProductDialogComponent } from './product/create-product/create-product-dialog.component';
import { EditProductDialogComponent } from './product/edit-product/edit-product-dialog.component';
import { ViewProductDialogComponent } from './product/view-product/view-product-dialog.component';
import { FormulaComponent } from './formula/formula.component';
import { CreateFormulaDialogComponent } from './formula/create-formula/create-formula-dialog.component';
import { EditFormulaDialogComponent } from './formula/edit-formula/edit-formula-dialog.component';
import { ViewFormulaDialogComponent } from './formula/view-formula/view-formula-dialog.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
@NgModule({
  declarations: [
    ProductionComponent,
    MaterialComponent,
    CreateMaterialDialogComponent,
    EditMaterialDialogComponent,
    ViewMaterialDialogComponent,
    ProductComponent,
    CreateProductDialogComponent,
    EditProductDialogComponent,
    ViewProductDialogComponent,
    FormulaComponent,
    CreateFormulaDialogComponent,
    EditFormulaDialogComponent,
    ViewFormulaDialogComponent,


  ],
  imports: [
    ProductionRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),

  
  
   

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductionModule { }
