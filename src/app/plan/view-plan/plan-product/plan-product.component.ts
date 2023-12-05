import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { PlanDto, PlanMaterialDto, PlanProductDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash';

@Component({
  selector: 'app-plan-product',
  templateUrl: './plan-product.component.html',

})
export class PlanProductComponent implements OnInit{

  @Input() planProducts: PlanProductDto[];
  chartDataConfig: ChartService;

  constructor(private chartService: ChartService,private _planService:PlanServiceProxy) {
    this.chartDataConfig = this.chartService;
  }
  ngOnInit(): void {
 
  }
  getTotalQuentity(planProduct: PlanProductDto, materialId){
    return planProduct.planProductMaterials.find(x=>x.materialId == materialId).requiredQuantity;
  }
  getChartData(planProduct: PlanProductDto){
    let materials = [];
    let data = [];
    planProduct.product.formulas.forEach(formula => {
      materials.push(formula.material.name);
    }); 
    planProduct.planProductMaterials.forEach(planProductMaterial => {
      data.push(planProductMaterial.requiredQuantity);
    }); 
  

    return {
      labels: materials,
      datasets: [
        {
          label: 'Requied quantity',
          borderColor: Colors.getColors().themeColor1,
          backgroundColor: Colors.getColors().themeColor1_10,
          data: data,
          borderWidth: 2
        }
      ]
    };
  }

}

