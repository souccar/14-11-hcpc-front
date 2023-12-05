import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOutputRequestDto, OutputRequestMaterialDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'create-output-request-dialog',
  templateUrl: './create-output-request-dialog.component.html',
  styleUrls: ['./create-output-request-dialog.component.scss']
})
export class CreateOutputRequestDialogComponent extends AppComponentBase {
  saving = false;
  outputRequest: CreateOutputRequestDto = new CreateOutputRequestDto();
  plans:PlanNameForDropdownDto[]=[]
  showItemIndex = 0;
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _outputRequestService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,
    private _planService:PlanServiceProxy,
    private _router: Router,
    private _location: Location


  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.outputRequest.outputRequestMaterials = [];
    this.initPlan();
  }


  backToAlloutputRequest(){
    this._location.back();

  }

  addOutputRequestMaterial(items: OutputRequestMaterialDto[]) {
    this.outputRequest.outputRequestMaterials = [...items];
    console.log(this.outputRequest.outputRequestMaterials)
  }
 initPlan()
 {
      this._planService.getNameForDropdown().subscribe((result)=>{
         this.plans=result;
         console.log(result)

      })
 }
  save(): void {


    if (this.outputRequest.outputRequestMaterials.length < 1) {
      this.notify.error(this.l('Add One output Request Material at least'));
    }
    else {
      this.saving = true;
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
          location.reload();
          this.onSave.emit();
        });
    }


  }

}
