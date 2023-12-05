import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { PlanDto, PlanMaterialDto, PlanProductDto, PlanServiceProxy, ProductServiceProxy, UpdatePlanDto } from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash';

@Component({
  selector: 'app-plan-product',
  templateUrl: './plan-product.component.html',

})
export class PlanProductComponent implements OnInit{

  @Input() planProducts: PlanProductDto[];
  chartDataConfig: ChartService;
  editable:boolean=false;
  numberOfItem:number;
  constructor(private chartService: ChartService,private _planService:PlanServiceProxy,
    private _productService:ProductServiceProxy
  ) {
    this.chartDataConfig = this.chartService;
  }
  ngOnInit(): void {

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
  editNumberofItem(event:any)
  {
       console.log(event)
    if(event.isTrusted){
       this.editable=true;
    }
  }
  CancelEdit()
  {
    this.editable=false;
  }
  updatePlan(numberOfItems:number,productId:number)
  {
    console.log(numberOfItems)
    console.log(productId)
    this.planProducts.forEach((item)=>{
      console.log(item)
      if(item.id==productId)
      {
        item.numberOfItems=numberOfItems
      }
    })
    let plan=new UpdatePlanDto();
    plan.planProducts=this.planProducts;
     console.log(plan.planProducts)
      this._planService.update(plan).subscribe((result)=>{

        console.log(result);

      })
  }
  deleteProduct(productId:number)
  {
    console.log(productId);
       this._productService.delete(productId).subscribe((result)=>{
        console.log(result)
       });
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

