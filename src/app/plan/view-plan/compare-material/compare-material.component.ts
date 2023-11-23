import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';

@Component({
  selector: 'app-compare-material',
  templateUrl: './compare-material.component.html'
})
export class CompareMaterialComponent{

  radarChartData = {
    datasets: [
      {
        label: 'Plan',
        borderWidth: 2,
        pointBackgroundColor: Colors.getColors().themeColor1,
        borderColor: Colors.getColors().themeColor1,
        backgroundColor: Colors.getColors().themeColor1_10,
        data: [400, 150, 200]
      },
      {
        label: 'Inventory',
        borderWidth: 2,
        pointBackgroundColor: Colors.getColors().themeColor2,
        borderColor: Colors.getColors().themeColor2,
        backgroundColor: Colors.getColors().themeColor2_10,
        data: [400, 200, 200]
      }
    ],
    labels: ['Water', 'Phosphat', 'Silicon']
  };
  
  chartDataConfig: ChartService;

  constructor(private chartService: ChartService) {
    this.chartDataConfig = this.chartService;
  }

}
