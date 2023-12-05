import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { MaterialDetailsComponent } from '@app/production/material/material-details/material-details.component';
import { PlanDto, PlanMaterialDto, PlanProductDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-plan-product',
  templateUrl: './plan-product.component.html',

})
export class PlanProductComponent implements OnInit{

  @Input() planProducts: PlanProductDto[];
  chartDataConfig: ChartService;

  constructor(private chartService: ChartService
    ,private _planService:PlanServiceProxy,
    private _modalService: BsModalService,) {
    this.chartDataConfig = this.chartService;
  }
  ngOnInit(): void {
 
  }
  editMaterial(id:number) {
    this._modalService.show(
      MaterialDetailsComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
        class:'modal-lg'
      }
    );
  }
  getTotalQuentity(planProduct: PlanProductDto, materialId){
    return planProduct.planProductMaterials.find(x=>x.materialId == materialId).requiredQuantity;
  }
  getNumberOfItem(planProduct: PlanProductDto, materialId){
    return planProduct.planProductMaterials.find(x=>x.materialId == materialId).canProduce;
  }
  checkBalanceIsSufficient(planProduct: PlanProductDto, materialId): boolean{
    var planProductMaterial = planProduct.planProductMaterials.find(x=>x.materialId == materialId);
    if(!planProductMaterial)
      return true;

    return planProductMaterial.canProduce == planProduct.numberOfItems;
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

