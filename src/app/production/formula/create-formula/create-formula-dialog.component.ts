import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'create-formula-dialog',
  templateUrl: './create-formula-dialog.component.html',

})
export class CreateFormulaDialogComponent extends AppComponentBase {
  saving = false;
  formula :any;
  // material =  new CreateUpdateBrandDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
   
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
  }
   save(): void {
  //   this.saving = true;
  //   this._brandService
  //     .insert(
  //       this.brand
  //     )
  //     .pipe(
  //       finalize(() => {
  //         this.saving = false;
  //       })
  //     )
  //     .subscribe((response:any) => {
  //       if(response.success){  
  //         this.toastr.success('Add Successfully');
  //         this.bsModalRef.hide();
  //         this.onSave.emit();}
  //     });

  }

}
