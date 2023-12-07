import { CreateFormulaDialogComponent } from './../../formula/create-formula/create-formula-dialog.component';
import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormulaDto, MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductDto, ProductNameForDropdownDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy, UpdateProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
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
  loaded=false;
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _productService:ProductServiceProxy,
    public bsModalRef: BsModalRef,
    private _materialService:MaterialServiceProxy,
    private _unitService:UnitServiceProxy,
    private _location: Location,
    private _route:ActivatedRoute



  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];

    })
    this.initProduct();

  }
  initProduct()
  {

    this._productService.get(this.id).subscribe((response:ProductDto)=>{
      this.product=response;
       (response)
      this.loaded=true
    })

  }
  backToAllProduct(){
    this._location.back();

  }
  initMaterials() {
    this._materialService.getNameForDropdown().subscribe((response:MaterialNameForDropdownDto[]) => {
      this.materials = response;
    });
  }
  addFormula(items: FormulaDto[]) {
    this.product.formulas = [...items];
  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((response:UnitNameForDropdownDto[]) => {
      this.units = response;
    });
  }

  save(): void {


    if (this.product.formulas.length < 1) {
      this.notify.error(this.l('Add One formula at least'));
    }
    else {

      this.product.formulas.forEach((element) =>
        element.id = 0
      );
      this.saving = true;
       (this.product)
      this._productService
        .update(
          this.product
        )
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((response: any) => {
          this.notify.info(this.l('SavedSuccessfully'));
          location.reload();
          this.onSave.emit();
        });
    }


  }

}
