import { Component, OnInit } from '@angular/core';
import { DailyProductionDto, DailyProductionServiceProxy, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-actually',
  templateUrl: './view-actually.component.html',

})
export class ViewActuallyComponent implements OnInit {
  dailyProduction = new DailyProductionDto();
  constructor(private _modalService: BsModalService,
    private _dailyProductionService: DailyProductionServiceProxy,
    private _planService: PlanServiceProxy) { }
  ngOnInit(): void {
    this.getLatestDailyProduction()
  }
  getLatestDailyProduction(){
    this._planService.getLastPlanActual().subscribe((result) => {

      if (result.id > 0) {
        this.dailyProduction.plan = result;

      }
    })
  }

}
