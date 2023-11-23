import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderLeftNavbarComponent } from './header/header-left-navbar.component';
import { HeaderLogoComponent } from './header/header-logo.component';
import { HeaderUserMenuComponent } from './header/header-user-menu.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {ContentTemplateModule} from './content-template/content-template.module';
import { SharedModule } from '@shared/shared.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLogoComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
  ],
  providers: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ContentTemplateModule,
    SharedModule,
    // PerfectScrollbarModule,
    CollapseModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    
  ],
  exports:[
    HeaderComponent,
    PaginationModule,
    HeaderLeftNavbarComponent,
    HeaderLogoComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    ContentTemplateModule,
    // PerfectScrollbarModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class LayoutModule { }
