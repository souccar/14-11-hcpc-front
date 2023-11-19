import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransferDto, TransferServiceProxy, SupplierDto, SupplierServiceProxy, UpdateTransferDto, UnitServiceProxy, UnitNameForDropdownDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-transfer-dialog',
  templateUrl: './edit-transfer-dialog.component.html',

})
export class EditTransferDialogComponent extends AppComponentBase {
  saving = false;

  id:number;
  fromUnits: UnitNameForDropdownDto[] = [];
  ToUnits: UnitNameForDropdownDto[] = [];
  transfer =  new UpdateTransferDto ();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _transferService:TransferServiceProxy,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this. initTransfer();
    this.initfromUnits();
    this.initToUnits();
  }
  initfromUnits() {
    this._unitService.getNameForDropdown().subscribe((result) => {
      this.fromUnits = result;
    });
  }
  initToUnits() {
    this._unitService.getNameForDropdown().subscribe((result) => {
      this.ToUnits = result;
    });
  }
 

  initTransfer(){
    this._transferService.get(this.id).subscribe((result) => {
     this.transfer = result;
   });
   }
   save(): void {
    this.saving = true;
    this._transferService
      .update(
        this.transfer
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
