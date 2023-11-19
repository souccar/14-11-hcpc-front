import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormulaDto, FormulaServiceProxy, MaterialNameForDropdownDto, MaterialServiceProxy, ProductNameForDropdownDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-formula-dialog',
  templateUrl: './edit-formula-dialog.component.html',

})
export class EditFormulaDialogComponent extends AppComponentBase {
  saving = false;
  formula :FormulaDto=new FormulaDto();
  id:number;
  productId:number;
  materials: MaterialNameForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  products: ProductNameForDropdownDto [] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _formulaService: FormulaServiceProxy,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy ,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initMaterials();
    this.initUnits();
    this.initFormula();

  }
  initFormula()
  {
    this._formulaService.get(this.id).subscribe((response:FormulaDto)=>{
      this.formula=response;
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
  this.formula.productId=this.productId
  this._formulaService.
    update(
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
