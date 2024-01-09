import { CreateOutputRequestMaterialDto, CreateOutputRequestProductDto, MaterialCodeForDropdownDto, MaterialServiceProxy, UnitNameForDropdownDto, WarehouseMaterialNameForDropdownDto, WarehouseMaterialServiceProxy, WarehouseNameForDropdownDto } from './../../../../shared/service-proxies/service-proxies';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
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
  materials: MaterialCodeForDropdownDto[] = [];
  materialId: number;
  @Input() productIds: number[] = [];
  @Output() saveoutputRequestMaterialList = new EventEmitter<CreateOutputRequestMaterialDto[]>();

  constructor(injector: Injector,
    private _warehouseMaterialService:WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _materialService: MaterialServiceProxy,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {
    console.log(this.productIds)
    this.initUnits();
    this.initialMaterialsForSelectedProducts(this.productIds);
    // this.initWarehouseMaterial();
  }

  initialMaterialsForSelectedProducts(productIds: number[]){
    this._materialService.getByProductsIds(productIds)
    .subscribe((result)=>{
      this.materials = result;
    });
  }

   initWarehouseMaterial()
   {
      this._warehouseMaterialService.getNameForDropdown().subscribe((result:WarehouseMaterialNameForDropdownDto [])=>{
        this.warehouseMaterialCode=result;
      })
   }
   getWarehouseCode(id: number) {
    this._warehouseMaterialService.getForEdit(id).subscribe((result) => {
      // this.warehouseCodes.push(result);
    });


  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((result: UnitNameForDropdownDto[]) => {
      this.units = result;
    });
  }
  getUnitName(id: any) {
    this._unitService.get(id).subscribe((result) => {
      this.unitsNames.push(result);
    });

 }

  addToOutputRequestMaterialList() {

    if (this.outputRequestMaterial.warehouseMaterialId == null || this.outputRequestMaterial.quantity == null || this.outputRequestMaterial.unitId == null) {
      return;
    }
    else {
      this.getUnitName(this.outputRequestMaterial.unitId);
      this.getWarehouseCode(this.outputRequestMaterial.warehouseMaterialId)
      this.data.push(this.outputRequestMaterial);
      this.data = [...this.data];
      this.saveoutputRequestMaterialList.emit(this.data);
      this.saving = true;
      this.outputRequestMaterial = new CreateOutputRequestMaterialDto()
    }
  }

  edit(row: CreateOutputRequestMaterialDto) {
    this.outputRequestMaterial = row
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.unitsNames.splice(index,1);
      this.warehouseCodes.splice(index,1)
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
