import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateFormulaDto, FormulaDto, FormulaServiceProxy, MaterialNameForDropdownDto, MaterialServiceProxy, ProductNameForDropdownDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';


@Component({
  selector: 'create-formula-dialog',
  templateUrl: './create-formula-dialog.component.html',
  styleUrls: ['./create-formula-dialog.component.scss']
})
export class CreateFormulaDialogComponent extends AppComponentBase {
  saving = false;
  materials: MaterialNameForDropdownDto[] = [];
  materialsForDropDown: MaterialNameForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  products: ProductNameForDropdownDto[] = [];
  productId: number;
  data: CreateFormulaDto[] = [];
  formula = new CreateFormulaDto();
  ColumnMode = ColumnMode;
  saveDisabled = true
  unitsNames: string[] = [];
  materialNames: string[] = [];


  @Output() saveFormulaList = new EventEmitter<CreateFormulaDto[]>();
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'QuantityCanNotBeNegativeOrZero',
    },
  ];
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

  }
  QuantityValidationErrors(){

    let errors: AbpValidationError[] = [{name:'min',localizationKey:'QuantityCanNotBeNegativeOrZero',propertyKey:'QuantityCanNotBeNegativeOrZero'}];
    return errors;
  }
  initMaterials() {
    this._materialService.getNameForDropdown().subscribe((response: MaterialNameForDropdownDto[]) => {
      this.materialsForDropDown = response;
    });
  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((response: UnitNameForDropdownDto[]) => {
      this.units = response;
    });
  }
  getUnitName(id: number) {

    this._unitService.getForEdit(id).subscribe((response) => {
      this.unitsNames.push(response.name);
    });
  }

  // getMaterialName(id: number) {
  //   const material = this.materials.find(x => x.id == id);
  //   if (material) {
  //     return material.name;
  //   }
  //   return '';

  // }

  getMaterialName(id: number) {
    this._materialService.getForEdit(id).subscribe((result) => {
      this.materials.push(result);
    });
  }
  addToFormulaList() {

   
    if (this.formula.materialId == null || this.formula.quantity == null || this.formula.unitId == null) {
      return;
    }
    else {
      this.getUnitName(this.formula.unitId);
      this.getMaterialName(this.formula.materialId)
      this.data.push(this.formula);
      this.data = [...this.data];
      this.saveFormulaList.emit(this.data);
      this.saving = true;
      this.formula = new FormulaDto()
    }


  }

  getUnitNameById(unitId) {
    return this.units.find(t => t.id == unitId).name;
  }

  edit(row: FormulaDto) {
    this.formula = row

    const index = this.data.indexOf(row);

    if (index !== -1) {
      this.data.splice(index, 1);
      this.unitsNames.splice(index, 1);
      this.materialNames.splice(index, 1);
    }

  
  }

  delete(row: FormulaDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.saveFormulaList.emit(this.data);
    }

  }

}
