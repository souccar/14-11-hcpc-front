import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateFormulaDto, CreateProductDto, FormulaDto, MaterialDto, ProductDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
@Component({
  selector: 'create-product-dialog',
  templateUrl: './create-product-dialog.component.html',

})
export class CreateProductDialogComponent extends AppComponentBase  {
  saving = false;
  product: CreateProductDto = new CreateProductDto();
  formulas: CreateFormulaDto[] = [];
  material: MaterialDto[] = [];
  showItemIndex = 0;
  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,
    private _router: Router,
    private _location: Location

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.product.formulas = []
  }
  addFormula(items: FormulaDto[]) {
    this.product.formulas = [...items];
  }

  backToAllProduct(){
    this._location.back();
  }

  save(): void {
    if (this.product.formulas.length < 1) {
      this.notify.error(this.l('Add One formula at least'));
    }
    else {
      this.saving = true;
      this._productService
        .create(
          this.product
        )
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((response: any) => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.backToAllProduct()
          this.onSave.emit();
        });
    }


  }

}
