import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { DailyProductionDto, DailyProductionServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateDialyProductionDialogComponent } from './create-dialy-production/create-dialy-production-dialog.component';

@Component({
  selector: 'daily-production',
  templateUrl: './daily-production.component.html',

})
export class DailyProductionComponent   {
  // extends PagedListingComponentBase<DailyProductionDto>
  ColumnMode = ColumnMode;
  displayMode = 'list';
  selectAllState = '';
  selected: DailyProductionDto[] = [];
  data: DailyProductionDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  // itemOrder = { label: this.l("Title"), value: "title" };
  itemOptionsOrders = [
    // { label: this.l("Title"), value: "title" },
  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title="Daily Production"
  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _dailyProductionService:DailyProductionServiceProxy ,
   ) {
    // super(injector);
  }


  // showAddNewModal(): void {
  //   let createOrEditDailyProductionDialog: BsModalRef;
  //   createOrEditDailyProductionDialog = this._modalService.show(
  //     CreateDialyProductionDialogComponent,
  //     {
  //       backdrop: true,
  //       ignoreBackdropClick: true,
  //       class: 'modal-lg',

  //     }
  //   );
  //   createOrEditDailyProductionDialog.content.onSave.subscribe(() => {
  //     this.refresh();
  //   });
  // }

  // isSelected(p: DailyProductionDto): boolean {
  
  //   return this.selected.findIndex(x => x.id === p.id) > -1;
  // }
  // onSelect(item: DailyProductionDto): void {
  
  //   if (this.isSelected(item)) {
  //     this.selected = this.selected.filter(x => x.id !== item.id);
  //   } else {
  //     this.selected.push(item);
  //   }
  //   this.setSelectAllState();
  // }


  // setSelectAllState(): void {
  //   if (this.selected.length === this.data.length) {
  //     this.selectAllState = 'checked';
  //   } else if (this.selected.length !== 0) {
  //     this.selectAllState = 'indeterminate';
  //   } else {
  //     this.selectAllState = '';
  //   }
  // }


  // pageChanged(event: any): void {
  //   // this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  // }

  // itemsPerPageChange(perPage: number): void {
  //   // this.loadData(perPage, 1, this.search, this.orderBy);
  // }

  // changeOrderBy(item: any): void {
  //   // this.loadData(this.itemsPerPage, 1, this.search, item.value);
  // }

  // searchKeyUp(event): void {
  //   const val = event.target.value.toLowerCase().trim();
  //   // this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  // }

  // changeDisplayMode(mode): void {
  //   this.displayMode = mode;
  // }

  // protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
  //   throw new Error('Method not implemented.');
  // }
  // protected delete(entity: DailyProductionDto): void {
  //   throw new Error('Method not implemented.');
  // }

}
