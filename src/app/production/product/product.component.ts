import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditProductDialogComponent } from './edit-product/edit-product-dialog.component';
import { CreateProductDialogComponent } from './create-product/create-product-dialog.component';
import { ViewProductDialogComponent } from './view-product/view-product-dialog.component';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends PagedListingComponentBase<any> {
  
  displayMode = 'list';
  selectAllState = '';
  selected: any[] = [];
  // selected: IProduct[] = [];
  data: any[] = [{
    name:"raneem",
    id:1
  },
  {
    name:"raghad",
    id:2
  }];
  // data: IProduct[] = [];
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
    { label: this.l("Point"), value: "point" },
    { label: this.l("Category"), value: "category" },
  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
  loading = false;
  title="Product"


 




  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(injector: Injector,
    private _modalService: BsModalService,) {
    // private apiService: ApiService
    super(injector);
  }


  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }


  viewButton(id:number)
{
  this._modalService.show(
    ViewProductDialogComponent,
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
    let editProductDialog: BsModalRef;
        editProductDialog = this._modalService.show(
        EditProductDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            id: id,
          },
          class: 'modal-lg',
        }
      );
      editProductDialog.content.onSave.subscribe(() => {
      // this.getAllProduct(this.itemsPerPage,1)
      });

    }

    deleteButton(id:number){
      // this._brandService.delete(id).subscribe((responce:any)=>{
      //   this.getAllBrand(this.itemsPerPage,1)
      //   this.toastr.success(responce.message);
      // });
  
    }
  loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = ''): void {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    // this.apiService.getProducts(pageSize, currentPage, search, orderBy).subscribe(
    //   data => {
    //     if (data.status) {
    //       this.isLoading = false;
    //       this.data = data.data.map(x => {
    //         return {
    //           ...x,
    //           img: x.img.replace('/img/', '/img/products/')
    //         };
    //       });
    //       this.totalItem = data.totalItem;
    //       this.totalPage = data.totalPage;
    //       this.setSelectAllState();
    //     } else {
    //       this.endOfTheList = true;
    //     }
    //   },
    //   error => {
    //     this.isLoading = false;
    //   }
    // );
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
              // this._productService.delete(element.id).subscribe(() => {
              //   abp.notify.success(this.l('SuccessfullyDeleted'));
              //   this.refresh();
              // });
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
    let createOrEditProductDialog: BsModalRef;
    createOrEditProductDialog = this._modalService.show(
      CreateProductDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
       class: 'modal-lg',

      }
    );
    createOrEditProductDialog.content.onSave.subscribe(() => {
      // this.getAllProduct(this.itemsPerPage,1)
    });
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
  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    // throw new Error('Method not implemented.');
  }
  protected delete(entity: any): void {
    // throw new Error('Method not implemented.');
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
