import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditProductDialogComponent } from './edit-product/edit-product-dialog.component';
import { CreateProductDialogComponent } from './create-product/create-product-dialog.component';
import { ViewProductDialogComponent } from './view-product/view-product-dialog.component';
import { ProductDto, ProductDtoPagedResultDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { CreateFormulaDialogComponent } from '../formula/create-formula/create-formula-dialog.component';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends PagedListingComponentBase<ProductDto> {

  displayMode = 'list';
  selectAllState = '';
  selected: ProductDto[] = [];
  data: ProductDto[] = [];
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
    { label: this.l("Description"), value: "description" },
  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title = this.l("Product")
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _productService: ProductServiceProxy,
    private _router: Router,
  ) {

    super(injector);
  }


  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  formula(id: number) {
    this._router.navigate(['/app/production/formula', id])
  }
  viewButton(id: number) {

    this._modalService.show(
      ViewProductDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
        class: 'modal-xl',
      }
    );

  }


  editButton(id: number): void {
    this._router.navigate(['app/production/editproduct',id]);
    // let editProductDialog: BsModalRef;
    // editProductDialog = this._modalService.show(
    //   EditProductDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //     class: 'modal-xl',
    //   }
    // );
    // editProductDialog.content.onSave.subscribe(() => {
    //   this.refresh();
    // });

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
        this.l('ProductDeleteWarningMessage', this.selected.length, 'Products'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._productService.delete(element.id).subscribe(() => {
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


    this._router.navigate(['app/production/newproduct']);

  }

  isSelected(p: any): boolean {
    // IProduct
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: any): void {
    // IProduct
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

    this._productService
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
      .subscribe((result: ProductDtoPagedResultDto) => {

        this.data = result.items;
 (this.data)
        this.totalItem = result.totalCount;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
        this.setSelectAllState();
      });
  }
  protected delete(entity: ProductDto): void {
    abp.message.confirm(
      this.l('productDeleteWarningMessage', this.selected.length, 'Products'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._productService.delete(entity.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  addFormula(id: number) {

    let formulaDialog: BsModalRef;
    formulaDialog = this._modalService.show(
      CreateFormulaDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          productId: id,
        },
        class: 'modal-xl',

      }
    );
    formulaDialog.content.onSave.subscribe(() => {
      this.refresh();
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
