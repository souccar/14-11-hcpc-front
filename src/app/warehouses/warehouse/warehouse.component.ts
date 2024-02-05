import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWarehouseDialogComponent } from './create-warehouse/create-warehouse-dialog.component';
import { EditWarehouseDialogComponent } from './edit-warehouse/edit-warehouse-dialog.component';
// import { ViewWarehouseDialogComponent } from '';
import { CreateWarehouseDto, UnitDto, UnitServiceProxy, WarehouseDto, WarehouseDtoPagedResultDto, WarehouseServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { forEach } from 'lodash-es';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ViewWarehouseDialogComponent } from './view-warehouse/view-warehouse-dialog.component';

@Component({
  selector: 'warehouse',
  templateUrl: './warehouse.component.html',

})
export class WarehouseComponent extends PagedListingComponentBase<WarehouseDto> {
  ColumnMode = ColumnMode;
  displayMode = 'list';
  selectAllState = '';
  selected: WarehouseDto[] = [];
   data: WarehouseDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOrder = { label: this.l("Name"), value: "name" };
  itemOptionsOrders = [
    { label: this.l("Name"), value: "name" },


  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title=this.l("Warehouse");



  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _warehouseService:WarehouseServiceProxy,

    ) {
    super(injector);
  }


  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);


  }





  viewButton(id:number)
{
  this._modalService.show(
    ViewWarehouseDialogComponent,
    {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    }
  );

}


  editButton(id:number): void {
    let editWarehouseDialog: BsModalRef;
        editWarehouseDialog = this._modalService.show(
        EditWarehouseDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            id: id,
          },
          class: 'modal-lg',
        }
      );
      editWarehouseDialog.content.onSave.subscribe(() => {
        this.refresh();
      });


    }

    protected delete(entity: WarehouseDto): void {

      abp.message.confirm(
        this.l('WarehouseDeleteWarningMessage', this.selected.length, ' Warehouses'),
        undefined,
        (result: boolean) => {
          if (result) {

            this._warehouseService.delete(entity.id).subscribe((recponce) => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
          }
        }
      );
    }
    loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', sort_Field: string = undefined, sort_Desc: boolean = false): void {
      let request: PagedProductsRequestDto = new PagedProductsRequestDto();
      this.itemsPerPage = pageSize;
      this.currentPage = currentPage;
      this.search = search;
      request.keyword = search;
      request.sort_Field = sort_Field;
      request.sort_Desc = sort_Desc;
      request.skipCount = (currentPage - 1) * pageSize;
      request.maxResultCount = this.itemsPerPage;
      this.list(request, this.pageNumber, () => { });


    }
  deleteItem(): void {
    if (this.selected.length == 0) {
      abp.message.info(this.l('YouHaveToSelectOneItemInMinimum'));
    }
    else {
      abp.message.confirm(
        this.l('WarehouseDeleteWarningMessage', this.selected.length, ' Warehouses'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._warehouseService.delete(element.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              });
            });
          }
        }
      );
    }
  }

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  showAddNewModal(): void {
    let createOrEditWarehouseDialog: BsModalRef;
    createOrEditWarehouseDialog = this._modalService.show(
      CreateWarehouseDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createOrEditWarehouseDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: WarehouseDto): boolean {

    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: WarehouseDto): void {

    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }
  protected list(
    request: PagedProductsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.search;

    // this._warehouseService
    //   .getAll(
    //     request.keyword,
    //     request.sort_Field,
    //    '',
    //     request.skipCount,
    //     request.MaxResultCount,
    //   )
    //   .pipe(
    //     finalize(() => {
    //       finishedCallback();
    //     })
    //   )
    //   .subscribe((result: WarehouseDtoPagedResultDto) => {

    //     this.data = result.items;

    //     this.totalItem = result.totalCount;
    //     result.items.forEach(element => {
    //     });
    //     this.totalPage =  ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
    //     this.setSelectAllState();


    //   });
  }


  setSelectAllState(): void {
    if (this.selected.length === this.data.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any): void {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  }


}
class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string;
  sort_Field: string;
  Including:string;
  sort_Desc: boolean;
  MaxResultCount:number
}

