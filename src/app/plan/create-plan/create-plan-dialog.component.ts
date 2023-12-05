import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreatePlanDto, PlanDto, PlanProductDto, PlanServiceProxy, ProductDto, UnitDto, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-plan-dialog',
  templateUrl: './create-plan-dialog.component.html',

})
export class CreatePlanDialogComponent extends AppComponentBase {
  saving = false;
  date;
  plan = new CreatePlanDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _planService: PlanServiceProxy,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);

  }

  addPlan(items: PlanProductDto[]) {
    this.plan.planProducts = [...items];
  }


  save(): void {
    this.saving = true;
    this.plan.startDate.toString();

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

         (response);
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });

  }

}
