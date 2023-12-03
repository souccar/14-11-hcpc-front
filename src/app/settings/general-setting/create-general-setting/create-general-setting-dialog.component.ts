import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateGeneralSettingDto, GeneralSettingServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-general-setting-dialog',
  templateUrl: './create-general-setting-dialog.component.html',

})
export class CreateGeneralSettingDialogComponent  extends AppComponentBase  {
  saving = false;
  generalSetting = new CreateGeneralSettingDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _GeneralSettingService: GeneralSettingServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {

  }

  
  save(): void {
    this.saving = true;
    this._GeneralSettingService.
      create(
        this.generalSetting
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
