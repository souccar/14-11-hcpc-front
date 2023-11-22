import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ViewSupplierDialogComponent } from './view-supplier/view-supplier-dialog.component';
import { CreateSupplierDialogComponent } from './create-supplier/create-supplier-dialog.component';
import { EditSupplierDialogComponent } from './edit-supplier/edit-supplier-dialog.component';
import { SupplierDto, SupplierDtoPagedResultDto, SupplierServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
  selector: 'supplier',
  templateUrl: './supplier.component.html',

})
export class SupplierComponent extends PagedListingComponentBase<SupplierDto> {
  ColumnMode = ColumnMode;
  displayMode = 'list';
  selectAllState = '';
  selected: SupplierDto[] = [];
   data: SupplierDto[] = [];
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
    { label: this.l("Description"), value: "description" },
    { label: this.l("price"), value: "price" },

  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title="Supplier"







  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _supplierService:SupplierServiceProxy) {
    super(injector);
  }


  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }


  viewButton(id:number)
{
  this._modalService.show(
    ViewSupplierDialogComponent,
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
    let editSupplierDialog: BsModalRef;
        editSupplierDialog = this._modalService.show(
        EditSupplierDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            id: id,
          },
          class: 'modal-lg',
        }
      );
      editSupplierDialog.content.onSave.subscribe(() => {
        this.refresh();
      });


    }

    protected delete(entity: SupplierDto): void {
      abp.message.confirm(
        this.l('SupplierDeleteWarningMessage', this.selected.length, 'Suppliers'),
        undefined,
        (result: boolean) => {
          if (result) {
            this._supplierService.delete(entity.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
          }
        }
      );
    }
    loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', sort_Field: string = undefined, sort_Desc: boolean = false): void {
      let request: PagedSupplierRequestDto = new PagedSupplierRequestDto();
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
        this.l('ProductDeleteWarningMessage', this.selected.length, 'Products'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._supplierService.delete(element.id).subscribe(() => {
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
    let createOrEditSupplierDialog: BsModalRef;
    createOrEditSupplierDialog = this._modalService.show(
      CreateSupplierDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
       class: 'modal-lg',

      }
    );
    createOrEditSupplierDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: SupplierDto): boolean {

    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: SupplierDto): void {

    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }
  protected list(
    request: PagedSupplierRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.search;

    this._supplierService
      .getAll(
        request.keyword,
        request.sort_Field,
        request.skipCount,
        request.MaxResultCount,
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: SupplierDtoPagedResultDto) => {

        this.data = result.items;

        this.totalItem = result.totalCount;
        this.totalPage =  ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
        this.setSelectAllState();
      });
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
class PagedSupplierRequestDto extends PagedRequestDto {
  keyword: string;
  sort_Field: string;
  sort_Desc: boolean;
  MaxResultCount:number
}

