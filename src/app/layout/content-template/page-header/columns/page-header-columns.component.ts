import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-page-header-columns',
  templateUrl: './page-header-columns.component.html'
})
export class PageHeaderColumnsComponent extends AppComponentBase {
  
  @Input() fields = [];
  @Output() selectedColumns: EventEmitter<any> = new EventEmitter();

  constructor(injector: Injector) {
    super(injector);
  }

  selectColumn(field){
    this.selectedColumns.emit(field);
  }
}
