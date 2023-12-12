import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateWarehouseMaterialDto, WarehouseMaterialServiceProxy, SupplierDto, SupplierServiceProxy, UpdateWarehouseMaterialDto, UnitNameForDropdownDto, MaterialNameForDropdownDto, UnitServiceProxy, MaterialServiceProxy, WarehouseServiceProxy, SupplierNameForDropdownDto, WarehouseNameForDropdownDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-warehouse-material-dialog',
  templateUrl: './edit-warehouse-material-dialog.component.html',

})
export class EditWarehouseMaterialDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  minDate:Date;
  maxDate:Date;
  warehouseMaterial = new UpdateWarehouseMaterialDto();
  units: UnitNameForDropdownDto[] = [];
  materials: MaterialNameForDropdownDto[] = [];
  suppliers: SupplierNameForDropdownDto[] = [];
  warehouses: WarehouseNameForDropdownDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _warehouseMaterialService: WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _materialService: MaterialServiceProxy,
    private _warehouseService: WarehouseServiceProxy ,
    private _supplierService: SupplierServiceProxy ,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {    
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate()+1);
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() );
    this.initWarehouseMaterial();
    this.initUnits();
    this.initMaterials();
    this. initWarehouses();
    this.initSuppliers()
  }
  initWarehouseMaterial(){
    this._warehouseMaterialService.get(this.id).subscribe((result) => {
      this.warehouseMaterial = result;
       (result)
    });
  }

  initUnits() {
    this._unitService.getNameForDropdown().subscribe((result) => {
      this.units = result;
    });
  }
  initSuppliers() {
    this._supplierService.getNameForDropdown().subscribe((result) => {
      this.suppliers = result;
    });
  }
  initMaterials() {
    this._materialService.getNameForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }
  initWarehouses() {
    this._warehouseService.getNameForDropdown().subscribe((result) => {
      this.warehouses = result;
    });
  }
   save(): void {
    this.saving = true;
     (this.warehouseMaterial)
    this._warehouseMaterialService
      .update(
        this.warehouseMaterial
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response:any) => {

          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
      });

  }

}
