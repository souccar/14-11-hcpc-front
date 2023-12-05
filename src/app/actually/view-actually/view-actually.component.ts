import { Component, OnInit } from '@angular/core';
import { DailyProductionDto, DailyProductionServiceProxy, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-actually',
  templateUrl: './view-actually.component.html',

})
export class ViewActuallyComponent implements OnInit {
  canProduce: boolean = false;
  dailyProduction: DailyProductionDto = new DailyProductionDto();
  constructor(private _modalService: BsModalService,
    private _dailyProductionService: DailyProductionServiceProxy,
    private _planService: PlanServiceProxy) { }
  ngOnInit(): void {
    this.getLatestDailyProduction()
  }
  getLatestDailyProduction(){
    this._dailyProductionService.get(2).subscribe((result) => {
      console.log(result)
      if (result.id > 0) {
        this.dailyProduction = result;
      }
    })
  }

  // editButton(id:number): void {
  //   let editPlanDialog: BsModalRef;
  //       editPlanDialog = this._modalService.show(
  //       EditPlanDialogComponent,
  //       {
  //         backdrop: true,
  //         ignoreBackdropClick: true,
  //         initialState: {
  //           id: id,
  //         },
  //         class: 'modal-lg',
  //       }
  //     );
  //     editPlanDialog.content.onSave.subscribe(() => {
  //       this.getLatestPlan()
  //     });


  //   }

}
