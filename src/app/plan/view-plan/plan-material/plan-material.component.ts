import { Component, Injector, Input, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanMaterialDto } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-plan-material',
  templateUrl: './plan-material.component.html'
})
export class PlanMaterialComponent extends AppComponentBase implements OnInit {

  @Input() planMaterials: PlanMaterialDto[] = [];
  radarChartData: any;
  chartDataConfig: ChartService;

  //Table
  rows = [];
  columns = [
    { prop: 'Title' },
    { name: 'Total Quantity' },
    { name: 'Inventory' },
    { name: 'Lead Time' },
    { name: 'Days' },
  ];
  columnMode = ColumnMode;

  constructor(injector: Injector,
    private _chartService: ChartService,
  ) {
    super(injector);
    this.chartDataConfig = this._chartService;
  }
  ngOnInit(): void {
    this.radarChartData = this.getChartData();
  }
  getChartData() {
    if (!this.planMaterials)
      return;

    let labels = [];
    let inventoryData = [];
    let planData = [];
    this.planMaterials.forEach(item => {
      labels.push(item.material?.name);
    });
    this.planMaterials.forEach(item => {
      this.rows.push({ 
        name: item.material.name, 
        totalQuantity: item.totalQuantity, 
        inventory: item.inventoryQuantity, 
        // leadTime: item.material.leadTime,
        produceDays: item.produceDays });
      inventoryData.push(Math.round(item.inventoryQuantity));
      planData.push(Math.round(item.totalQuantity));
    });
    return {
      datasets: [
        {
          label: 'Plan',
          borderWidth: 2,
          pointBackgroundColor: Colors.getColors().themeColor1,
          borderColor: Colors.getColors().themeColor1,
          backgroundColor: Colors.getColors().themeColor1_10,
          data: planData
        },
        {
          label: 'Inventory',
          borderWidth: 2,
          pointBackgroundColor: Colors.getColors().themeColor3,
          borderColor: Colors.getColors().themeColor3,
          backgroundColor: Colors.getColors().themeColor3_10,
          data: inventoryData
        },
      ],
      labels: labels
    };
  }
}