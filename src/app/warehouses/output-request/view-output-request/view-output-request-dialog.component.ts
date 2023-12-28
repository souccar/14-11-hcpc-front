import { Component, OnInit } from '@angular/core';
import { MaterialDto, MaterialServiceProxy, WarehouseMaterialDto } from '@shared/service-proxies/service-proxies';
import { OutputRequestDto, OutputRequestServiceProxy, UnitDto, UnitServiceProxy, WarehouseDto, WarehouseServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-output-request-dialog',
  templateUrl: './view-output-request-dialog.component.html',
  styleUrls: ['./view-output-request-dialog.component.scss']
})
export class ViewOutputRequestDialogComponent implements OnInit {

  data: OutputRequestDto = new OutputRequestDto();
  id: number;
  loaded = false;
  editable: true;
  unitName: UnitDto = new UnitDto();
  material: MaterialDto = new MaterialDto();
  unitNames: UnitDto[] = [];
  warehouseNames: WarehouseDto[] = [];
  warehouseName: WarehouseDto = new WarehouseDto();
  constructor(public bsModalRef: BsModalRef,
    private _outputService: OutputRequestServiceProxy,
    private _unitService: UnitServiceProxy,
    private _warehouseService: WarehouseServiceProxy,
    private _materialService: MaterialServiceProxy) { }
  ngOnInit(): void {
    this.initOutputRequest()
  }

  initOutputRequest() {
    this._outputService.get(this.id).subscribe((response: OutputRequestDto) => {
      this.data = response;
      console.log(this.data);
      this.loaded = true;
      this.data.outputRequestMaterials.forEach((element) => {
        this.initUnitNames(element.unitId);
        this.initWarehouseCode(element.warehouseMaterial.warehouseId);
        this.initMaterialName(element.warehouseMaterial.materialId);
      })

    })
  }
  initUnitNames(id: number) {
    this._unitService.get(id).subscribe((result) => {
      this.unitName = result;
      this.unitNames.push(this.unitName);
    })
  }
  initWarehouseCode(id: number) {
    this._warehouseService.get(id).subscribe((result) => {
      this.warehouseName = result;
      this.warehouseNames.push(this.warehouseName);
    })
  }
  initMaterialName(id:number)
  {
        this._materialService.get(id).subscribe((result)=>{

          this.material=result;
        })
  }



}
