import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWarehouseMaterialDialogComponent } from './create-warehouse-Material/create-warehouse-material-dialog.component';
import { EditWarehouseMaterialDialogComponent } from './edit-warehouse-Material/edit-warehouse-Material-dialog.component';
import { ViewWarehouseMaterialDialogComponent } from './view-warehouse-Material/view-warehouse-Material-dialog.component';
import { CreateWarehouseMaterialDto, MaterialDto, MaterialServiceProxy, UnitDto, UnitServiceProxy, WarehouseMaterialDto, WarehouseMaterialDtoPagedResultDto, WarehouseMaterialServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { forEach } from 'lodash-es';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'warehouseMaterial',
  templateUrl: './warehouse-material.component.html',

})
export class WarehouseMaterialComponent extends PagedListingComponentBase<WarehouseMaterialDto> {
  ColumnMode = ColumnMode;
  displayMode = 'list';
  selectAllState = '';
  selected: WarehouseMaterialDto[] = [];
   data: WarehouseMaterialDto[] = [];
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
  title="Material Warehouse"

materials: MaterialDto[] = [];
units: UnitDto[] = [];
 




  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _warehouseMaterialService:WarehouseMaterialServiceProxy,
    private _materialService:MaterialServiceProxy,
    private _unitService:UnitServiceProxy,
    ) {
    super(injector);
  }


  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);

    
  }

  getMaterialById(materialId){
   
    this._materialService.get(materialId).subscribe((responce)=>{
    this.materials.push (responce);
    });
  }
  getUnitById(unitId){
  
    this._unitService.get(unitId).subscribe((responce)=>{

      this.units.push (responce);
   
    });
  }


  viewButton(id:number)
{
  this._modalService.show(
    ViewWarehouseMaterialDialogComponent,
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
    let editWarehouseMaterialDialog: BsModalRef;
        editWarehouseMaterialDialog = this._modalService.show(
        EditWarehouseMaterialDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            id: id,
          },
          class: 'modal-lg',
        }
      );
      editWarehouseMaterialDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
   

    }

    protected delete(entity: WarehouseMaterialDto): void {
    
      abp.message.confirm(
        this.l('WarehouseMaterialDeleteWarningMessage', this.selected.length, ' WarehouseMaterials'),
        undefined,
        (result: boolean) => {
          if (result) {
           
            this._warehouseMaterialService.delete(entity.id).subscribe((recponce) => {
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
        this.l('WarehouseMaterialDeleteWarningMessage', this.selected.length, ' WarehouseMaterials'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._warehouseMaterialService.delete(element.id).subscribe(() => {
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
    let createOrEditWarehouseMaterialDialog: BsModalRef;
    createOrEditWarehouseMaterialDialog = this._modalService.show(
      CreateWarehouseMaterialDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createOrEditWarehouseMaterialDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: WarehouseMaterialDto): boolean {
  
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: WarehouseMaterialDto): void {
  
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

    this._warehouseMaterialService
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
      .subscribe((result: WarehouseMaterialDtoPagedResultDto) => {
        
        this.data = result.items;

        this.totalItem = result.totalCount;
        result.items.forEach(element => {
          this.getMaterialById(element.materialId);
          this.getUnitById(element.unitId);
          console.log(this.materials)
          console.log(this.units)
        });
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

