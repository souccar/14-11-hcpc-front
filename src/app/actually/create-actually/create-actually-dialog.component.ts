import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateDailyProductionDetailsDto, CreateDailyProductionDto, DailyProductionDto, DailyProductionServiceProxy, PlanNameForDropdownDto, PlanProductDto, PlanServiceProxy, ProductDto, ProductNameForDropdownDto, UnitDto, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash-es';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-actually-dialog',
  templateUrl: './create-actually-dialog.component.html',

})
export class CreateActuallyDialogComponent extends AppComponentBase {
  saving = false;
  planProductloaded=false;
  dailyProduction = new CreateDailyProductionDto();
  plans: PlanNameForDropdownDto[] = [];
  planProducts: PlanProductDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _dailyProductionService: DailyProductionServiceProxy,
    private _planService: PlanServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.dailyProduction.dailyProductionDetails=[]
    this.initPlans();
  }
  initPlans() {
    this._planService.getNameForDropdown().subscribe((result) => {
      this.plans = result;
      console.log(this.plans);
    });
  }
  getProductForPlan(id:number){

    if(id!=null){ 
      this._planService.get(id).subscribe((result)=>{
        this.planProducts=result.planProducts;
        this.planProductloaded=true;
       });
  }

   
  }

  save(): void {
    this.saving = true;
    console.log(this.dailyProduction)
    this._dailyProductionService.
      create(
        this.dailyProduction
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
