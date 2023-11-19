import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateWarehouseMaterialDto, WarehouseMaterialServiceProxy, SupplierDto, SupplierServiceProxy, UpdateWarehouseMaterialDto, UnitNameForDropdownDto, MaterialNameForDropdownDto, UnitServiceProxy, MaterialServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-warehouse-material-dialog',
  templateUrl: './edit-warehouse-material-dialog.component.html',

})
export class EditWarehouseMaterialDialogComponent extends AppComponentBase {
  saving = false;

  id:number;
  units: UnitNameForDropdownDto[] = [];
  materials: MaterialNameForDropdownDto[] = [];
  warehouseMaterial =  new UpdateWarehouseMaterialDto ();
  suppliers: SupplierDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _warehouseMaterialService:WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _materialService: MaterialServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initUnits();
    this.initMaterials();
    this.initWarehouseMaterial();
  }



  initWarehouseMaterial(){
    this._warehouseMaterialService.get(this.id).subscribe((result) => {
     this.warehouseMaterial = result;
   });
   }
   initUnits() {
    this._unitService.getNameForDropdown().subscribe((result) => {
      this.units = result;
    });
  }
  initMaterials() {
    this._materialService.getNameForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }
   save(): void {
    this.saving = true;
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
