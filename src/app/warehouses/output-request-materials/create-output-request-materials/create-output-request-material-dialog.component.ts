import { CreateOutputRequestMaterialDto, UnitNameForDropdownDto, WarehouseMaterialNameForDropdownDto, WarehouseMaterialServiceProxy, WarehouseNameForDropdownDto } from './../../../../shared/service-proxies/service-proxies';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'create-output-request-material-dialog',
  templateUrl: './create-output-request-material-dialog.component.html',
  styleUrls: ['./create-output-request-material-dialog.component.scss']
})
export class CreateOutputRequestMaterialDialogComponent extends AppComponentBase {
  saving = false;
  units: UnitNameForDropdownDto[] = [];
  data: CreateOutputRequestMaterialDto[] = [];
  outputRequestMaterial = new CreateOutputRequestMaterialDto();
  ColumnMode = ColumnMode;
  warehouseMaterialCode:WarehouseMaterialNameForDropdownDto[]=[]
  saveDisabled = true
  unitsNames: UnitNameForDropdownDto[] = [];
  warehouseCodes: WarehouseMaterialNameForDropdownDto[] = [];
  warehouseCode: WarehouseMaterialNameForDropdownDto[] = [];

  @Output() saveoutputRequestMaterialList = new EventEmitter<CreateOutputRequestMaterialDto[]>();

  constructor(injector: Injector,
    private _warehouseMaterialService:WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {

    this.initUnits();
    this.initWarehouseMaterial()

  }

   initWarehouseMaterial()
   {
      this._warehouseMaterialService.getNameForDropdown().subscribe((result:WarehouseMaterialNameForDropdownDto [])=>{
        this.warehouseMaterialCode=result;
      })
   }
   getWarehouseCode(id: number) {
    this._warehouseMaterialService.get(id).subscribe((result) => {
      this.warehouseCodes.push(result);
    });


  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((result: UnitNameForDropdownDto[]) => {
      this.units = result;
    });
  }
  getUnitName(id: number) {

    this._unitService.get(id).subscribe((result) => {
      this.unitsNames.push(result);
    });
  }


  addToOutputRequestMaterialList() {

    if (this.outputRequestMaterial.warehouseMaterialId == null || this.outputRequestMaterial.quantity == null || this.outputRequestMaterial.unitId == null) {
      return;
    }
    else {
      this.data.push(this.outputRequestMaterial);
      this.data = [...this.data];
      this.saveoutputRequestMaterialList.emit(this.data);
      this.saving = true;
      this.getUnitName(this.outputRequestMaterial.unitId);
      this.getWarehouseCode(this.outputRequestMaterial.warehouseMaterialId)
      this.outputRequestMaterial = new CreateOutputRequestMaterialDto()
    }



  }

  getUnitNameById(unitId) {
    return this.units.find(t => t.id == unitId).name;
  }
  getWarehouseMaterialByCode(warehouseMaterialId)
  {

    // return this.warehouseCode.find(t => t.id == warehouseMaterialId).code;
       const warehouseCode = this.warehouseCode.find(x => x.id == warehouseMaterialId);
    if (warehouseCode) {

      return warehouseCode.code;
    }
    return '';
  }

  edit(row: CreateOutputRequestMaterialDto) {
    this.outputRequestMaterial = row
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  delete(row: CreateOutputRequestMaterialDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.saveoutputRequestMaterialList.emit(this.data);
    }

  }

}
