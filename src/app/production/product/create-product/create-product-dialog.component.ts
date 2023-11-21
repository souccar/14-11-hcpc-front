import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { CreateFormulaDialogComponent } from '@app/production/formula/create-formula/create-formula-dialog.component';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateFormulaDto, CreateProductDto, FormulaDto, FormulaServiceProxy, MaterialDto, MaterialServiceProxy, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-product-dialog',
  templateUrl: './create-product-dialog.component.html',

})
export class CreateProductDialogComponent extends AppComponentBase {
  saving = false;
  product: CreateProductDto = new CreateProductDto();
  formulas: CreateFormulaDto[] = [];
  material: MaterialDto[] = [];
  selectedPeople = [{ name: 'Karyn Wright' }];
  people: [{ 'raneem', 'rem' }]
  @Output() onSave = new EventEmitter<any>();
  
  constructor(injector: Injector,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.product.formulas = []
  }
  addFormula(items: FormulaDto[]) {
    this.product.formulas = [...items];
  }

  save(): void {


    if (this.product.formulas.length < 1) {
      this.notify.error(this.l('Add One formula at least'));
    }
    else {
      this.saving = true;
      console.log(this.product)
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
          this.bsModalRef.hide();
          this.onSave.emit();
        });
    }


  }

}
