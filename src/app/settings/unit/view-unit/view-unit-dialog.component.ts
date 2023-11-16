import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransferDto, TransferServiceProxy, SupplierDto, SupplierServiceProxy, UpdateTransferDto, UnitServiceProxy, UnitNameForDropdownDto, UnitDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
@Component({
  selector: 'view-unit-dialog',
  templateUrl: './view-unit-dialog.component.html',
  
})
export class ViewUnitDialogComponent extends AppComponentBase {
  saving = false;
  editable:true;
  id:number;
  unit: UnitDto=new UnitDto();

 
  constructor(injector: Injector,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {

   
    this. initUnit();
    
  }
 
 

  initUnit(){
    console.log(this.id)
    this._unitService.get(this.id).subscribe((result) => {
     this.unit = result;

   });
   }

}