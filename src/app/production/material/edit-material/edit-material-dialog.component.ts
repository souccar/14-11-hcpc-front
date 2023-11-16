import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMaterialDto, MaterialServiceProxy, SupplierDto, SupplierServiceProxy, UpdateMaterialDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-material-dialog',
  templateUrl: './edit-material-dialog.component.html',

})
export class EditMaterialDialogComponent extends AppComponentBase {
  saving = false;

  id:number;
  
  material =  new UpdateMaterialDto ();
  suppliers: SupplierDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _materialService:MaterialServiceProxy,
    private _supplierService:SupplierServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this. initSupplier();
  }

  initSupplier(){
   this._supplierService.getAll("","",1,1).subscribe((result) => {
    this.suppliers = result.items;
  });
  }

  initMaterial(){
  //   this._materialService.get(this.id).subscribe((result) => {
  //    this.material = result;
  //  });
   }
   save(): void {
    this.saving = true;
    this._materialService
      .update(
        this.material
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
