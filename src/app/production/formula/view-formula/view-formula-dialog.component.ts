import { FormulaDto, FormulaServiceProxy, MaterialDto, MaterialServiceProxy, UnitDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-formula-dialog',
  templateUrl: './view-formula-dialog.component.html',

})
export class ViewFormulaDialogComponent implements OnInit {
  material:MaterialDto=new MaterialDto();
  unit:UnitDto=new UnitDto();
  data :FormulaDto=new FormulaDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,
    private __materialService:MaterialServiceProxy,
    private _unitService:UnitServiceProxy,
    private _formulaService:FormulaServiceProxy){}
  ngOnInit(): void {
   this.initFormula()
  }
  initFormula()
  {
    this._formulaService.get(this.id).subscribe((response:FormulaDto)=>{
      this.data=response;
      this.initMaterials(this.data.materialId);
      this.initUnits(this.data.unitId);
    })
  }
  initMaterials(id:number) {
    this.__materialService.get(id).subscribe((response:MaterialDto) => {
      this.material = response;
    });
  }
  initUnits(id:number) {
    this._unitService.get(id).subscribe((response:UnitDto) => {
      this.unit = response;
    });
  }



}
