import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActuallyComponent } from './actually.component';
import { ActuallyRoutingModule } from './actually-routing.module';
import { EditActuallyDialogComponent } from './edit-actually/edit-actually-dialog.component';
import { CreateActuallyDialogComponent } from './create-actually/create-actually-dialog.component';
import { ViewActuallyComponent } from './view-actually/view-actually.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [

    ActuallyComponent,
    CreateActuallyDialogComponent,
    EditActuallyDialogComponent,
    ViewActuallyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    PaginationModule.forRoot(),
    BsDropdownModule,
    CommonModule,
    ActuallyRoutingModule,
  ],
  schemas:[NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA]
})
export class ActuallyModule { }
