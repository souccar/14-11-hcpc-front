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
  saveDisabled = true
  unitsNames:string[]=[];
  materialNames:string[]=[];

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
  getUnitName(id:number){
    this._unitService.get(id).subscribe((response)=>{
      this.unitsNames.push(response.name);
    });
  }
  
  getMaterialName(id:number){
    this._materialService.get(id).subscribe((response)=>{
      this.materialNames.push(response.name);
    });
  }
  addToFormulaList() {
    this.getUnitName(this.formula.unitId);
    this.getMaterialName(this.formula.materialId);
    console.log(  this.materialNames);
    console.log(  this.unitsNames);
    this.data.push(this.formula)
    this.formula = new FormulaDto()
    this.data = [...this.data]
    this.saveFormulaList.emit(this.data);
    this.saving = true;
  }
  edit(row: FormulaDto) {
    this.formula = row
    const index = this.data.indexOf(row);
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
