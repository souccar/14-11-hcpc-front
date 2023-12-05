import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { GeneralSettingDto, GeneralSettingDtoPagedResultDto, GeneralSettingServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditGeneralSettingDialogComponent } from './edit-general-setting/edit-general-setting-dialog.component';
import { finalize } from 'rxjs';
import { CreateGeneralSettingDialogComponent } from './create-general-setting/create-general-setting-dialog.component';

@Component({
  selector: 'general-setting',
  templateUrl: './general-setting.component.html',

})
export class GeneralSettingComponent extends PagedListingComponentBase<GeneralSettingDto> {
  
  displayMode = 'list';
  selectAllState = '';
  selected: GeneralSettingDto[] = [];
  data: GeneralSettingDto[] = [];
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
  title="GeneralSetting"
  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _GeneralSettingService:GeneralSettingServiceProxy,
    ) {
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
  // this._modalService.show(
  //   ViewGeneralSettingDialogComponent,
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
    let editGeneralSettingDialog: BsModalRef;
        editGeneralSettingDialog = this._modalService.show(
        EditGeneralSettingDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            id: id,
          },
          class: 'modal-lg',
        }
      );
      editGeneralSettingDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
   

    }

    protected delete(entity: GeneralSettingDto): void {
    
      abp.message.confirm(
        this.l('GeneralSettingDeleteWarningMessage', this.selected.length, 'GeneralSettings'),
        undefined,
        (result: boolean) => {
          if (result) {
           
            this._GeneralSettingService.delete(entity.id).subscribe((recponce) => {
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
        this.l('GeneralSettingDeleteWarningMessage', this.selected.length, 'GeneralSettings'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._GeneralSettingService.delete(element.id).subscribe(() => {
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
    let createOrEditGeneralSettingDialog: BsModalRef;
    createOrEditGeneralSettingDialog = this._modalService.show(
      CreateGeneralSettingDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createOrEditGeneralSettingDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: GeneralSettingDto): boolean {
  
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: GeneralSettingDto): void {
  
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
  

    this._GeneralSettingService
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
      .subscribe((result: GeneralSettingDtoPagedResultDto) => {
        
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
  Including:string;
  sort_Desc: boolean;
  MaxResultCount:number
}

