import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateFormulaDto, FormulaDto, FormulaServiceProxy, MaterialNameForDropdownDto, MaterialServiceProxy, ProductNameForDropdownDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
  selector: 'create-formula-dialog',
  templateUrl: './create-formula-dialog.component.html',

})
export class CreateFormulaDialogComponent extends AppComponentBase {
  saving = false;
  materials: MaterialNameForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  products: ProductNameForDropdownDto[] = [];
  productId: number;
  data: CreateFormulaDto[] = [];
  formula = new CreateFormulaDto();
  ColumnMode = ColumnMode;
  saveDisabled = true;
  @Output() saveFormulaList = new EventEmitter<CreateFormulaDto[]>();
  
  constructor(injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _productService: ProductServiceProxy,
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
    this._materialService.getNameForDropdown().subscribe((response: MaterialNameForDropdownDto[]) => {
      this.materials = response;
    });
  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((response: UnitNameForDropdownDto[]) => {
      this.units = response;
    });
  }
  initProducts() {
    this._productService.getNameForDropdown().subscribe((response: ProductNameForDropdownDto[]) => {
      this.products = response;
    });
  }
  addToFormulaList() {
    if(this.formula.materialId ==null || this.formula.name == null || this.formula.quantity==null || this.formula.unitId ==null){
      return;
    }
    else{
      this.data.push(this.formula)
      this.formula = new FormulaDto()
      this.data = [...this.data]
      this.saveFormulaList.emit(this.data);
      this.saving = true;
    }
  }

getUnitNameById(unitId){
  return  this.units.find(t=>t.id ==unitId).name;
}

  edit(row: FormulaDto) {
    this.formula = row
    console.log(row)
    const index = this.data.indexOf(row);
    console.log(index);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  delete(row: FormulaDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
    }

  }

}
