import { Component, Injector } from '@angular/core';
import { MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, SupplierNameForDropdownDto, SupplierServiceProxy, UnitDto, UnitNameForDropdownDto, UnitServiceProxy, UpdateWarehouseMaterialDto, WarehouseMaterialDto, WarehouseMaterialServiceProxy, WarehouseNameForDropdownDto, WarehouseServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-warehouse-material-dialog',
  templateUrl: './view-warehouse-material-dialog.component.html',

})
export class ViewWarehouseMaterialDialogComponent {
  loaded = false;
  id:number;
  editable=true;
  warehouseMaterial = new WarehouseMaterialDto();
  units: UnitNameForDropdownDto[] = [];
  materials: MaterialNameForDropdownDto[] = [];
  suppliers: SupplierNameForDropdownDto[] = [];
  warehouses: WarehouseNameForDropdownDto[] = [];

  constructor(
    private _warehouseMaterialService: WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _materialService: MaterialServiceProxy,
    private _warehouseService: WarehouseServiceProxy ,
    private _supplierService: SupplierServiceProxy ,
    public bsModalRef: BsModalRef,

  ) {
   
  }
  ngOnInit(): void {
    this.initWarehouseMaterial();
   
  }
  initWarehouseMaterial(){
    this._warehouseMaterialService.get(this.id).subscribe((result) => {
      this.warehouseMaterial = result;
      console.log(result)
      this.loaded=true;
    });
  }

}
