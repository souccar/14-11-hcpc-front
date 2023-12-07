import { Component, OnInit } from '@angular/core';
import { PlanDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-actually',
  templateUrl: './view-actually.component.html',

})
export class ViewActuallyComponent implements OnInit {


  canProduce:boolean=false;
  plan:PlanDto=new PlanDto();
  changeStatus=false;

  constructor( private _modalService: BsModalService,
    private _planService:PlanServiceProxy){}
  ngOnInit(): void {
  this.getLatestPlan()
}

getLatestPlan()
{
  this._planService.getLastPlanActual().subscribe((result) => {
    if(result.id > 0){
      this.plan = result;
    }
  })
}
changePlanStatusToActually(){
  this._planService.changeStatusToActual(this.plan.id).subscribe((result)=>{
    this.changeStatus=true;
  })
}
changePlanStatusToArchive(){
  this._planService.changeStatusToArchive(this.plan.id).subscribe((result)=>{
  })
}

}