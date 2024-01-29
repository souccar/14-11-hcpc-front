import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateTransferDialogComponent } from './create-transfer/create-transfer-dialog.component';
import { EditTransferDialogComponent } from './edit-transfer/edit-transfer-dialog.component';
import { ViewTransferDialogComponent } from './view-transfer/view-transfer-dialog.component';
import { CreateTransferDto, TransferDto, TransferDtoPagedResultDto, TransferServiceProxy, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',

})
export class TransferComponent extends PagedListingComponentBase<TransferDto> {

  displayMode = 'list';
  selectAllState = '';
  selected: TransferDto[] = [];
  data: TransferDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  ColumnMode = ColumnMode;
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
  title=this.l('Transfer')
  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _transferService:TransferServiceProxy,
    private _unitService:UnitServiceProxy) {
    super(injector);
  }


  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }
// getFromUnitName(){
// this._unitService.getNameForDropdown().subscribe
// }

  viewButton(id:number)
{
  this._modalService.show(
    ViewTransferDialogComponent,
    {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    }
  );

}
  showViewModal(id:number){

    // this._modalService.show(
    //   ViewEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //   }
    // );

  }


  editButton(id:number): void {
    let editTransferDialog: BsModalRef;
        editTransferDialog = this._modalService.show(
        EditTransferDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            id: id,
          },
          class: 'modal-lg',
        }
      );
      editTransferDialog.content.onSave.subscribe(() => {
        this.refresh();
      });


    }

    protected delete(entity: TransferDto): void {

      abp.message.confirm(
        this.l('TransferDeleteWarningMessage', this.selected.length, 'Transfers'),
        undefined,
        (result: boolean) => {
          if (result) {

            this._transferService.delete(entity.id).subscribe((recponce) => {
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
        this.l('TransferDeleteWarningMessage', this.selected.length, 'Transfers'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._transferService.delete(element.id).subscribe(() => {
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
    let createOrEditTransferDialog: BsModalRef;
    createOrEditTransferDialog = this._modalService.show(
      CreateTransferDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createOrEditTransferDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: TransferDto): boolean {

    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: TransferDto): void {

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
    request.Including ="From,To";

    // this._transferService
    //   .getAll(
    //     request.keyword,
    //     request.sort_Field,
    //     request.Including,
    //     request.skipCount,
    //     request.MaxResultCount,
    //   )
    //   .pipe(
    //     finalize(() => {
    //       finishedCallback();
    //     })
    //   )
    //   .subscribe((result: TransferDtoPagedResultDto) => {

    //     this.data = result.items;
    //      (result)
    //     this.totalItem = result.totalCount;
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

