import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateWarehouseMaterialDto, WarehouseMaterialServiceProxy, UnitServiceProxy, UnitNameForDropdownDto, MaterialNameForDropdownDto, MaterialServiceProxy, WarehouseServiceProxy, SupplierNameForDropdownDto, SupplierServiceProxy, WarehouseNameForDropdownDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  selector: 'create-warehouse-material-dialog',
  templateUrl: './create-warehouse-material-dialog.component.html',
})
export class CreateWarehouseMaterialDialogComponent extends AppComponentBase {
  saving = false;
  warehouseMaterial = new CreateWarehouseMaterialDto();
  units: UnitNameForDropdownDto[] = [];
  materials: MaterialNameForDropdownDto[] = [];
  suppliers: SupplierNameForDropdownDto[] = [];
  warehouses: WarehouseNameForDropdownDto[] = [];
  minDate:Date;
  maxDate:Date;
  @Output() onSave = new EventEmitter<any>();
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'PriceCanNotBeNegativeOrZero',
    },
  ];
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
    this.initUnits();
    this.initMaterials();
    this. initWarehouses();
    this.initSuppliers()
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
  priceValidationErrors(){
    let errors: AbpValidationError[] = [{name:'min',localizationKey:'PriceCanNotBeNegativeOrZero',propertyKey:'PriceCanNotBeNegativeOrZero'}];
    return errors;
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
    this._warehouseMaterialService.
      create(
        this.warehouseMaterial
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });

  }

}
