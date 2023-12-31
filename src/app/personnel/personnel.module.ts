import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelComponent } from './personnel.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EmployeeComponent } from './employee/employee.component';
import { ChartsModule } from '@app/@components/charts/charts.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';

@NgModule({
  declarations: [
    PersonnelComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PersonnelRoutingModule,
    
  ],
  providers:[
    EmployeeServiceProxy,
    DatePipe
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class PersonnelModule { }
