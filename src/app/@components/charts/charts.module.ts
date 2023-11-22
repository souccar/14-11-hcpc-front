import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartService } from './chart.service';
import { Colors } from './color.service';
import {BarChartComponent} from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    BarChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BarChartComponent
  ],
  providers:[
    ChartService,
    Colors
  ]
})
export class ChartsModule { }
