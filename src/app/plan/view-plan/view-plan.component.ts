import { Component, OnInit } from '@angular/core';
import { PlanDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditPlanDialogComponent } from '../edit-plan/edit-plan-dialog.component';

@Component({
  selector: 'view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss']
})
export class ViewPlanComponent implements OnInit{


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
  this._planService.getLastPlan().subscribe((result)=>{
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

editButton(id:number): void {
  let editPlanDialog: BsModalRef;
      editPlanDialog = this._modalService.show(
      EditPlanDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
        class: 'modal-lg',
      }
    );
    editPlanDialog.content.onSave.subscribe(() => {
      this.getLatestPlan()
    });


  }

}
