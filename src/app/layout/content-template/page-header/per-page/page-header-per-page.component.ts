import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-page-header-per-page',
  templateUrl: './page-header-per-page.component.html'
})
export class PageHeaderPerPageComponent extends AppComponentBase {

  @Input() pageSize = 10;
  @Input() itemOptionsPerPage = [10, 50, 100];
  @Output() onChangePage: EventEmitter<any> = new EventEmitter();
  
  constructor(injector:Injector) {
    super(injector);
  }

  onChangeItemsPerPage(item): void  {
    this.onChangePage.emit(item);
  }
}
