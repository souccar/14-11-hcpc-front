import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateFormulaDto, FormulaServiceProxy, MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductNameForDropdownDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-formula-dialog',
  templateUrl: './create-formula-dialog.component.html',

})
export class CreateFormulaDialogComponent extends AppComponentBase {
  saving = false;
  formula = new CreateFormulaDto();
  materials: MaterialNameForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  products: ProductNameForDropdownDto [] = [];
  productId:number;
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _formulaService: FormulaServiceProxy,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy ,
    private _productService: ProductServiceProxy  ,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {

    this.initMaterials();
    this.initUnits();
    this.initProducts();
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
  initProducts() {
    this._productService.getNameForDropdown().subscribe((response:ProductNameForDropdownDto[]) => {
      this.products = response;
    });
  }
  save(): void {
    this.saving = true;
    this.formula.productId=this.productId
    this._formulaService.
      create(
        this.formula
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {

        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });

  }

}
