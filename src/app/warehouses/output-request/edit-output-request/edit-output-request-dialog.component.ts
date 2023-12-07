import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { OutputRequestMaterialDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanServiceProxy, UpdateOutputRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'edit-output-request-dialog',
  templateUrl: './edit-output-request-dialog.component.html',
  styleUrls: ['./edit-output-request-dialog.component.scss']
})
export class EditOutputRequestDialogComponent extends AppComponentBase {
  saving = false;
  outputRequest: UpdateOutputRequestDto = new UpdateOutputRequestDto();
  plans:PlanNameForDropdownDto[]=[]
  id:number;
  showItemIndex = 0;
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _outputRequestService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,
    private _planService:PlanServiceProxy,
    private _router: ActivatedRoute,
    private _location: Location


  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.outputRequest.outputRequestMaterials = [];
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];

    })
    this.initOutputRequest();
    this.initPlan()
  }


  backToAlloutputRequest(){
    this._location.back();

  }

  addOutputRequestMaterial(items: OutputRequestMaterialDto[]) {
    this.outputRequest.outputRequestMaterials = [...items];
  }
  initOutputRequest()
  {
    this._outputRequestService.get(this.id).subscribe((result)=>{

      this.outputRequest=result;

    })
  }
  initPlan()
  {
      this._planService.getActualPlansNameForDropdown().subscribe((result)=>{
        this.plans=result
      })
  }
  save(): void {


    if (this.outputRequest.outputRequestMaterials.length < 1) {
      this.notify.error(this.l('Add One output Request Material at least'));
    }
    else {
      this.saving = true;
       (this.outputRequest)
      this._outputRequestService
        .update(
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
