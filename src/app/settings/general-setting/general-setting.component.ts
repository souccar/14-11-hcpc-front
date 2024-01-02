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
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title=this.l("GeneralSetting");
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


  // showAddNewModal(): void {
  //   let createOrEditGeneralSettingDialog: BsModalRef;
  //   createOrEditGeneralSettingDialog = this._modalService.show(
  //     CreateGeneralSettingDialogComponent,
  //     {
  //       backdrop: true,
  //       ignoreBackdropClick: true,
  //       class: 'modal-lg',

  //     }
  //   );
  //   createOrEditGeneralSettingDialog.content.onSave.subscribe(() => {
  //     this.refresh();
  //   });
  // }

  isSelected(p: GeneralSettingDto): boolean {

    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: GeneralSettingDto): void {

    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
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

        this.totalItem = result.totalCount;
        this.totalPage =  ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
       
      });
  }
}
class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string;
  sort_Field: string;
  Including:string;
  sort_Desc: boolean;
  MaxResultCount:number
}

