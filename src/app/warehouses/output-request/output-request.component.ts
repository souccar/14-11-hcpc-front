import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OutputRequestDto, OutputRequestDtoPagedResultDto, OutputRequestServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ViewOutputRequestDialogComponent } from './view-output-request/view-output-request-dialog.component';


@Component({
  selector: 'output-request',
  templateUrl: './output-request.component.html',
})
export class OutputRequestComponent extends PagedListingComponentBase<OutputRequestDto> {
  ColumnMode = ColumnMode;
  displayMode = 'list';
  selectAllState = '';
  selected: OutputRequestDto[] = [];
  data: OutputRequestDto[] = [];
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
  title = this.l("OutputRequest")
  outPutRequest: OutputRequestDto[] = [];
  tooltipData = {
    changeStatus:"change Status"
  };






  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _OutputRequestService: OutputRequestServiceProxy,
    private _router:Router,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);

  }
  viewButton(id: number) {
    this._modalService.show(
      ViewOutputRequestDialogComponent,
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
    this._router.navigate(['app/warehouses/editOutputRequest',id])


  }

  protected delete(entity: OutputRequestDto): void {

    abp.message.confirm(
      this.l('OutputRequestDeleteWarningMessage', this.selected.length, ' OutputRequests'),
      undefined,
      (result: boolean) => {
        if (result) {

          this._OutputRequestService.delete(entity.id).subscribe((recponce) => {
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
        this.l('OutputRequestDeleteWarningMessage', this.selected.length, ' OutputRequests'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._OutputRequestService.delete(element.id).subscribe(() => {
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

    this._router.navigate(['app/warehouses/newOutputRequest']);
  }

  isSelected(p: OutputRequestDto): boolean {

    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: OutputRequestDto): void {

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
    request.Including ="Plan,OutputRequestProducts";
    this._OutputRequestService
      .getAll(
        request.keyword,
        request.sort_Field,
        request.Including,
        request.skipCount,
        request.MaxResultCount,
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: OutputRequestDtoPagedResultDto) => {
        this.data = result.items;
        this.totalItem = result.totalCount;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
        this.setSelectAllState();


      });
  }


  onchangeStatusToInProduction(id:number)
{
    this._OutputRequestService.changeStatus(1,id).subscribe((result)=>{

      this.notify.info(this.l('changeSuccessfully'));
      this.bsModalRef.hide();
      location.reload();



    })

}

onchangeStatusToFinish(id:number)
{
    this._OutputRequestService.changeStatus(2,id).subscribe((result)=>{

      this.notify.info(this.l('changeSuccessfully'));
      this.bsModalRef.hide();
      location.reload();

    })

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
  Including: string;
  sort_Desc: boolean;
  MaxResultCount: number
}

