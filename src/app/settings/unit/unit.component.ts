import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUnitDialogComponent } from './create-unit/create-unit-dialog.component';
import { EditUnitDialogComponent } from './edit-unit/edit-unit-dialog.component';
import { ViewUnitDialogComponent } from './view-unit/view-unit-dialog.component';
import { CreateUnitDto, UnitDto, UnitDtoPagedResultDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',

})
export class UnitComponent extends PagedListingComponentBase<UnitDto> {

  displayMode = 'list';
  selectAllState = '';
  selected: UnitDto[] = [];
  data: UnitDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  ColumnMode = ColumnMode;

  itemOrder = { label: this.l("Name"), value: "name" };
  itemOptionsOrders = [
    { label: this.l("Name"), value: "name" },
  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title = "Unit"
  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _unitService: UnitServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  viewButton(id: number) {
    this._modalService.show(
      ViewUnitDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
      }
    );

  }


  editButton(id: number): void {
    let editUnitDialog: BsModalRef;
    editUnitDialog = this._modalService.show(
      EditUnitDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
        class: 'modal-lg',
      }
    );
    editUnitDialog.content.onSave.subscribe(() => {
      this.refresh();
    });


  }

  protected delete(entity: UnitDto): void {

    abp.message.confirm(
      this.l('UnitDeleteWarningMessage', this.selected.length, 'Units'),
      undefined,
      (result: boolean) => {
        if (result) {

          this._unitService.delete(entity.id).subscribe((recponce) => {
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
        this.l('UnitDeleteWarningMessage', this.selected.length, 'Units'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._unitService.delete(element.id).subscribe(() => {
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
    let createOrEditUnitDialog: BsModalRef;
    createOrEditUnitDialog = this._modalService.show(
      CreateUnitDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createOrEditUnitDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: UnitDto): boolean {

    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: UnitDto): void {

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

    this._unitService
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
      .subscribe((result: UnitDtoPagedResultDto) => {

        this.data = result.items;

        this.totalItem = result.totalCount;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
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
class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string;
  sort_Field: string;
  sort_Desc: boolean;
  MaxResultCount: number
}

