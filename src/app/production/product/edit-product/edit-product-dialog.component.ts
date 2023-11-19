import { CreateFormulaDialogComponent } from './../../formula/create-formula/create-formula-dialog.component';
import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormulaDto, MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductDto, ProductNameForDropdownDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy, UpdateProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',

})
export class EditProductDialogComponent extends AppComponentBase {
  saving = false;
  product :UpdateProductDto=new UpdateProductDto();
  formulas:FormulaDto[]=[];
  materials: MaterialNameForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  id:number
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _productService:ProductServiceProxy,
    public bsModalRef: BsModalRef,
    private _materialService:MaterialServiceProxy,
    private _unitService:UnitServiceProxy


  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initMaterials();
    this.initUnits();
    this.initProduct();
  }
  initProduct()
  {
    this._productService.get(this.id).subscribe((response:ProductDto)=>{
      this.product=response;
    })

  }
  initMaterials() {
    this._materialService.getNameForDropdown().subscribe((response:MaterialNameForDropdownDto[]) => {
      this.materials = response;
    });
  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((response:UnitNameForDropdownDto[]) => {
      this.units = response;
    });
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
