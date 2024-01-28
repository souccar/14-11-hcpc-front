import { Component,  ViewChild, EventEmitter, Output, Input, Injector, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { Location } from '@angular/common';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent extends AppComponentBase {
  
  displayOptionsCollapsed = false;

  @Input() title = "Unknown";
  @Input() showOrderBy = true;
  @Input() showSearch = true;
  @Input() showAdvanceFilter = true;
  @Input() showItemsPerPage = true;
  @Input() pageSize = 10;
  @Input() itemOptionsPerPage = [10, 50, 100];
  @Input() itemOrder ;
  @Input() fields = [];
  @Input() filtering: boolean = false;
  @Input() ParentName = '';
  @Input() IsDetail: boolean  = false;
  @Input() CreatePermission: string  = '';


  @Output() changeDisplayMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() addNewItem: EventEmitter<any> = new EventEmitter();
  @Output() advanceFilter: EventEmitter<any> = new EventEmitter();
  @Output() searchKeyUp: EventEmitter<any> = new EventEmitter();
  @Output() onChangePage: EventEmitter<any> = new EventEmitter();
  @Output() changeOrderBy: EventEmitter<any> = new EventEmitter();

  @ViewChild('search') search: any;
  constructor(injector: Injector,
    private _location: Location) {
    super(injector);
   }

  onSelectDisplayMode(mode: string): void {
    this.changeDisplayMode.emit(mode);
  }
  onAddNewItem(): void {
    this.addNewItem.emit(null);
  }
  
  onChangeItemsPerPage(item): void  {
    this.onChangePage.emit(item);
  }

  onSearchKeyUp($event): void {
    
    this.searchKeyUp.emit($event);
  }

  onChangeOrderBy($event){

  }

  onFilter(){
    this.advanceFilter.emit('show_filter');
  }

  clearFilter(){
    this.advanceFilter.emit('clear_filter');
  }
  backTo(){
    this._location.back();
  }
}
