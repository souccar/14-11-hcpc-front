import { Component } from '@angular/core';
import { MaterialDto, MaterialServiceProxy, UnitDto, UnitServiceProxy, UpdateWarehouseMaterialDto, WarehouseMaterialServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-warehouse-material-dialog',
  templateUrl: './view-warehouse-material-dialog.component.html',

})
export class ViewWarehouseMaterialDialogComponent {saving = false;
  editable:true;
  id:number;
  unit: UnitDto=new UnitDto();
  material: MaterialDto=new MaterialDto();

  materialWarehouse =  new UpdateWarehouseMaterialDto ();
 
  constructor(
    private _warehouseMaterialService:WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _materialService: MaterialServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    
  }
  ngOnInit(): void {

   
    this. initWarehouseMaterial();
    
  }
  initUnits() {
    this._unitService.get(this.materialWarehouse.unitId).subscribe((result) => {
      this.unit = result;
    });
  }
  initMaterial() {
    this._materialService.get(this.materialWarehouse.materialId).subscribe((result) => {
      this.material = result;
    });
  }
 

  initWarehouseMaterial(){
    console.log(this.id)
    this._warehouseMaterialService.get(this.id).subscribe((result) => {
     this.materialWarehouse = result;
     this.initUnits();
    this.initMaterial();

   });
   }

}
