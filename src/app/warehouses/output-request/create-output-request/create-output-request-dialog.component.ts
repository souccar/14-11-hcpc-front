import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOutputRequestDto, OutputRequestServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-output-request-dialog',
  templateUrl: './create-output-request-dialog.component.html',
  styleUrls: ['./create-output-request-dialog.component.scss']
})
export class CreateOutputRequestDialogComponent extends AppComponentBase {
  saving = false;
  outputRequest: CreateOutputRequestDto = new CreateOutputRequestDto();
  plans:[]=[]
  showItemIndex = 0;
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _outputRequestService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,
    private _router: Router,
    private _location: Location

  ) {
    super(injector);
  }
  ngOnInit(): void {
    // this.outputRequest.formulas = []
  }


  backToAlloutputRequest(){
    // this._location.back();

  }


  save(): void {


    // if (this.outputRequest.formulas.length < 1) {
    //   this.notify.error(this.l('Add One formula at least'));
    // }
    // else {
      this.saving = true;
      console.log(this.outputRequest)
      this._outputRequestService
        .create(
          this.outputRequest
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


  // }

}
