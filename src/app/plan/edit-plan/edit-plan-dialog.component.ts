import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanProductDto, PlanServiceProxy, UnitServiceProxy, UpdatePlanDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-plan-dialog',
  templateUrl: './edit-plan-dialog.component.html',

})
export class EditPlanDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  loaded=false;
  plan = new UpdatePlanDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _planService: PlanServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initPlan()
  
  }

  initPlan()
  {
    this._planService.get(this.id).subscribe((response)=>{
      this.plan=response;
      console.log( this.plan)
      this.loaded=true;

    })
  }
  addPlan(items: PlanProductDto[]) {
    this.plan.planProducts = [...items];
  }


  save(): void {
    
    this.plan.startDate.toString();
    console.log(this.plan)
    if (this.plan.planProducts.length < 1) {
      this.notify.error(this.l('Add One formula at least'));
    }
    else{
      this.saving = true;
      this.plan.planProducts.forEach((element) =>
      element.id = 0
    );
    this._planService.
    create(
      this.plan
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

}