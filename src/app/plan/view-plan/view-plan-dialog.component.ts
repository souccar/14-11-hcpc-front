import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { PlanDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-plan-dialog',
  templateUrl: './view-plan-dialog.component.html',

})
export class ViewPlanDialogComponent implements OnInit{

  PlanInfo:PlanDto=new PlanDto
  materials: [] = listOfMaterials;
  public barChartData: any = {
    labels: ['Water', 'Phosphat', 'Silicon'],
    datasets: [
      {
        label: 'Requied quantity',
        borderColor: Colors.getColors().themeColor1,
        backgroundColor: Colors.getColors().themeColor1_10,
        data: [400, 210, 220],
        borderWidth: 2
      }
    ]
  };
  chartDataConfig: ChartService;

  constructor(private chartService: ChartService,private _planService:PlanServiceProxy) {
    this.chartDataConfig = this.chartService;
  }
  ngOnInit(): void {
    this. getInformationOfLatestPlan()
  }
  getInformationOfLatestPlan()
  {
    this._planService.getLastPlan().subscribe((response)=>{
      this.PlanInfo=response;
    })
  }



}

const listOfMaterials: any = [
  {
    name: 'Water',
    quantity: '200 ml',
    color: 'border-theme-2'
  },
  {
    name: 'Phosphat',
    quantity: '200 g',
    color: 'border-theme-2'
  },
  {
    name: 'Silicon',
    quantity: '200 ml',
    color: 'border-danger'
  }

];