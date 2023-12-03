import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateWarehouseDto, WarehouseServiceProxy  } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-warehouse-dialog',
  templateUrl: './create-warehouse-dialog.component.html',

})


export class CreateWarehouseDialogComponent extends AppComponentBase {
  saving = false;
  warehouse = new CreateWarehouseDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _warehouseService: WarehouseServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
  
  }


  save(): void {
    this.saving = true;
    this._warehouseService.
      create(
        this.warehouse
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {

        console.log(response);
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });

  }

}
