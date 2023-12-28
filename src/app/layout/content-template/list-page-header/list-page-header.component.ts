import { Component,  ViewChild, EventEmitter, Output, Input, Injector, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {HeadingComponent} from '../heading/heading.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-list-page-header',
  templateUrl: './list-page-header.component.html'
})
export class ListPageHeaderComponent extends AppComponentBase {
  displayOptionsCollapsed = false;

  @Input() title = "Unknown";
  @Input() showOrderBy = true;
  @Input() showSearch = true;
  @Input() showItemsPerPage = true;
  @Input() showDisplayMode = false;
  @Input() displayMode = 'list';
  @Input() selectAllState = '';
  @Input() itemsPerPage = 10;
  @Input() itemOptionsPerPage = [10, 50, 100];
  @Input() itemOrder ;
  @Input()  itemOptionsOrders = [];

  @Output() changeDisplayMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() addNewItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() editItem: EventEmitter<any> = new EventEmitter();
  @Output() selectAllChange: EventEmitter<any> = new EventEmitter();
  @Output() searchKeyUp: EventEmitter<any> = new EventEmitter();
  @Output() itemsPerPageChange: EventEmitter<any> = new EventEmitter();
  @Output() changeOrderBy: EventEmitter<any> = new EventEmitter();

  @ViewChild('search') search: any;
  constructor(injector: Injector) {
    super(injector);
   }

  onSelectDisplayMode(mode: string): void {
    this.changeDisplayMode.emit(mode);
  }
  onAddNewItem(): void {
    this.addNewItem.emit(null);
  }


  onDeleteItem(): void {
    this.deleteItem.emit(null);
  }

  onEditItem(): void {
    this.editItem.emit(null);
  }

  selectAll(event): void  {
    this.selectAllChange.emit(event);
  }
  onChangeItemsPerPage(item): void  {
    this.itemsPerPageChange.emit(item);
  }

  onChangeOrderBy(item): void  {
    this.itemOrder = item;
    this.changeOrderBy.emit(item);
  }

  onSearchKeyUp($event): void {
    this.searchKeyUp.emit($event);
  }
}
