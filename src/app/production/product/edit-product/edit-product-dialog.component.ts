import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductDto, ProductServiceProxy, UpdateProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',

})
export class EditProductDialogComponent extends AppComponentBase {
  saving = false;
  product :UpdateProductDto=new UpdateProductDto();
  id:number
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _productService:ProductServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initProduct()
  }
  initProduct()
  {
    this._productService.get(this.id).subscribe((response:ProductDto)=>{
      this.product=response;
    })

  }
   save(): void {
    this.saving = true;
    this._productService
      .update(
        this.product
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response:any) => {
        this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
      });

  }

}
