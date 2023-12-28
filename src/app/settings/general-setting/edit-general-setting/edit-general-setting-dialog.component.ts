import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { GeneralSettingServiceProxy, UpdateGeneralSettingDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-general-setting-dialog',
  templateUrl: './edit-general-setting-dialog.component.html',

})
export class EditGeneralSettingDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  generalSetting = new UpdateGeneralSettingDto();
  @Output() onSave = new EventEmitter<any>();
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'ExpiryDurationNotifyCanNotBeNegativeOrZero',
    },
  ];
  constructor(injector: Injector,
    private _GeneralSettingService: GeneralSettingServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initiGeneralSetting();
  }
  initiGeneralSetting() {
    this._GeneralSettingService.get(this.id).subscribe((result) => {
      this.generalSetting = result;
    });
  }
  
  expiryDurationNotifyValidationErrors(){
    let errors: AbpValidationError[] = [{name:'min',localizationKey:'ExpiryDurationNotifyCanNotBeNegativeOrZero',propertyKey:'ExpiryDurationNotifyCanNotBeNegativeOrZero'}];
    return errors;
  }
  save(): void {
    this.saving = true;
    this._GeneralSettingService.
      update(
        this.generalSetting
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
