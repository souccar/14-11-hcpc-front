import { Component } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';

@Component({
  selector: 'view-plan-dialog',
  templateUrl: './view-plan-dialog.component.html',

})
export class ViewPlanDialogComponent {

  public barChartData: any = {
    labels: ['Water', 'Phosphat', 'Silicon'],
    datasets: [
      {
        label: 'Men shampo',
        borderColor: Colors.getColors().themeColor1,
        backgroundColor: Colors.getColors().themeColor1_10,
        data: [250, 210, 220],
        borderWidth: 2
      }
    ]
  };
  chartDataConfig: ChartService;

  constructor(private chartService: ChartService) {
    this.chartDataConfig = this.chartService;
  }
  
  
  
}
