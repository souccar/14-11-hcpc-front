import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreatePlanDialogComponent } from './create-plan/create-plan-dialog.component';
import { EditPlanDialogComponent } from './edit-plan/edit-plan-dialog.component';
import { ViewPlanDialogComponent } from './view-plan/view-plan-dialog.component';
import { CreatePlanDto, PlanDto, PlanDtoPagedResultDto, PlanServiceProxy, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',

})
export class PlanComponent extends PagedListingComponentBase<PlanDto> {
  ColumnMode = ColumnMode;
  displayMode = 'list';
  selectAllState = '';
  selected: PlanDto[] = [];
  data: PlanDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOrder = { label: this.l("Title"), value: "title" };
  itemOptionsOrders = [
    { label: this.l("Title"), value: "title" },
  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title="Plan"
  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _planService:PlanServiceProxy,
   ) {
    super(injector);
  }


  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  viewButton(id:number)
{
  this._modalService.show(
    ViewPlanDialogComponent,
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
    let editPlanDialog: BsModalRef;
        editPlanDialog = this._modalService.show(
        EditPlanDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            id: id,
          },
          class: 'modal-lg',
        }
      );
      editPlanDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
   

    }

    protected delete(entity: PlanDto): void {
    
      abp.message.confirm(
        this.l('PlanDeleteWarningMessage', this.selected.length, 'Plans'),
        undefined,
        (result: boolean) => {
          if (result) {
           
            this._planService.delete(entity.id).subscribe((recponce) => {
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
        this.l('PlanDeleteWarningMessage', this.selected.length, 'Plans'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._planService.delete(element.id).subscribe(() => {
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
    let createOrEditPlanDialog: BsModalRef;
    createOrEditPlanDialog = this._modalService.show(
      CreatePlanDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createOrEditPlanDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: PlanDto): boolean {
  
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: PlanDto): void {
  
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

    this._planService
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
      .subscribe((result: PlanDtoPagedResultDto) => {
        
        this.data = result.items;
        console.log(result)
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
class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string;
  sort_Field: string;
  sort_Desc: boolean;
  MaxResultCount:number
}

