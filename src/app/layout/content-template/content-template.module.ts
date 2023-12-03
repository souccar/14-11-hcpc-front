import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageHeaderComponent } from './list-page-header/list-page-header.component';
import { HeadingComponent } from './heading/heading.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ApplicationMenuComponent } from './application-menu/application-menu.component';
import { SharedModule } from '@shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    ListPageHeaderComponent,
    HeadingComponent,
    ApplicationMenuComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    // PerfectScrollbarModule,

    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule
  ],
  exports:[
    ListPageHeaderComponent,
    HeadingComponent,
    ApplicationMenuComponent,
    BreadcrumbComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class ContentTemplateModule { }
