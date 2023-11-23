import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanDto, PlanProductDto, PlanServiceProxy, ProductDto, ProductNameForDropdownDto, ProductServiceProxy, UpdatePlanDto, UpdatePlanProductDto } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'edit-plan-product-dialog',
  templateUrl: './edit-plan-product-dialog.component.html',

})
export class EditPlanProductDialogComponent extends AppComponentBase {
  saving = false;
  loaded = false;
  products: ProductDto[] = [];
  productsForDropDown: ProductNameForDropdownDto[] = [];
  productId: number;
  product:ProductDto=new ProductDto();
  planProduct:UpdatePlanProductDto=new UpdatePlanProductDto();
  data: UpdatePlanProductDto[] = [];
  plan: UpdatePlanDto=new UpdatePlanDto ();
  ColumnMode = ColumnMode;
 
  @Input() planId: number;
  @Output() savePlanProductList = new EventEmitter<UpdatePlanProductDto[]>();
  
  constructor(injector: Injector,
    private _productService: ProductServiceProxy,
    private _planProductService: ProductServiceProxy,
    private _planService:PlanServiceProxy,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initPlan();
    this.initProducts();

  }

  initProducts() {
    this._productService.getNameForDropdown().subscribe((response: ProductNameForDropdownDto[]) => {
      this.productsForDropDown = response;
 
    
    });
  }
 
 

  initPlan() {
    this._planService.get(this.planId ).subscribe((response: PlanDto) => {
      this.plan = response;
      console.log( this.plan  )
      this.plan.planProducts.forEach(element => {
      this.data.push(element);
       this.getProductName(element.productId);
        this.data = [...this.data]


      });
    })

  }

  getProductName(id:number){
    this._productService.get(id).subscribe((response)=>{
      this.products.push(response);
    });
  }
 
  addToProductList()
  {
  
    this.getProductName(this.planProduct.productId)
    this.data.push(this.planProduct)
    console.log(this.data)
    this.planProduct = new PlanProductDto()
    this.data = [...this.data]
    this.savePlanProductList.emit(this.data);
    this.saving = true;

  }
 
  edit(row: PlanProductDto) {
    this.planProduct = row
    console.log(row)

    const index = this.data.indexOf(row);
    console.log(index);

    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  delete(row: PlanProductDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.savePlanProductList.emit(this.data);
    }
    

  }

}
