import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateDailyProductionDetailsDto, CreateDailyProductionDto, DailyProductionDto, DailyProductionServiceProxy, OutputRequestDto, OutputRequestNameForDropdownDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanProductDto, PlanServiceProxy, ProductDto, ProductNameForDropdownDto, ReadOutputRequesProductDto, UnitDto, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash-es';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-actually-dialog',
  templateUrl: './create-actually-dialog.component.html',

})
export class CreateActuallyDialogComponent extends AppComponentBase {
  saving = false;
  planProductloaded = false;
  dailyProduction = new CreateDailyProductionDto();
  plans: PlanNameForDropdownDto[] = [];
  outputRequests: OutputRequestNameForDropdownDto[] = [];
  outputRequestsProducts: ReadOutputRequesProductDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _dailyProductionService: DailyProductionServiceProxy,
    private _planService: PlanServiceProxy,
    private _outputService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.dailyProduction.dailyProductionDetails = []
    this.initPlans();
  }
  initPlans() {
    this._planService.getActualPlansNameForDropdown().subscribe((result) => {
      this.plans = result;
      
    });
  }

  getOutputRequestsOfPlan(planId: number){
      this._outputService.getPlanOutputRequests(planId).subscribe((result)=>{
        // this.outputRequests=result;
      });
  }

  getProductOutputRequestPlan(id: number) {
  
    if (id != null) {
      this._outputService.getPlanOutputRequests(id).subscribe((result) => {
        result.forEach((item)=>{
          this.outputRequestsProducts=item.outputRequestProducts;
          this.planProductloaded=true;
        })
    
      });
    }
  }

  updatedQuantity(args, index){
    this.dailyProduction.dailyProductionDetails[index].quantity = args.target.value;
  }

  save(): void {
   console.log(this.dailyProduction)
   console.log(this.outputRequestsProducts)
   this.outputRequestsProducts.forEach((item)=>{
    console.log(item);
     let dailyProduction:CreateDailyProductionDetailsDto=new CreateDailyProductionDetailsDto();
     dailyProduction.productId=item.id;
    //  dailyProduction.quantity=item.product.quantitiy;
   });
   this.dailyProduction.dailyProductionDetails
  
    this.saving = true;
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
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
