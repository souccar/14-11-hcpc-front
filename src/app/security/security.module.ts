import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SecurityComponent } from './security.component';
import { SecurityRoutingModule } from './security-routing.module';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { TreeviewModule } from 'ngx-treeview';
import { EditRoleComponent } from './role/edit-role/edit-role.component';


@NgModule({
  declarations: [
    SecurityComponent,
    RoleComponent,
    CreateRoleComponent,
    ViewRoleComponent,
    EditRoleComponent
  ],
  imports: [
    AccordionModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    PaginationModule.forRoot(),
    TreeviewModule.forRoot(),
    CommonModule,
    SecurityRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurityModule { }
