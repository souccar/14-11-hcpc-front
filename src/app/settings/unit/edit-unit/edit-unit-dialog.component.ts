import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateUnitDto, UnitServiceProxy, SupplierDto, SupplierServiceProxy, UpdateUnitDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-unit-dialog',
  templateUrl: './edit-unit-dialog.component.html',

})
export class EditUnitDialogComponent extends AppComponentBase {
  saving = false;

  id:number;
  
  unit =  new UpdateUnitDto ();
  suppliers: SupplierDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _unitService:UnitServiceProxy,
    private _supplierService:SupplierServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initUnit();
  }

  initSupplier(){
   this._supplierService.getAll("","",1,1).subscribe((result) => {
    this.suppliers = result.items;
  });
  }

  initUnit(){
    this._unitService.get(this.id).subscribe((result) => {
     this.unit = result;
   });
   }
   save(): void {
    this.saving = true;
    this._unitService
      .update(
        this.unit
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response:any) => {
        if(response.success){  
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();}
      });

  }

}
