import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { PlanDto, PlanProductDto, PlanServiceProxy, ProductDto, ProductDtoPagedResultDto, ProductNameForDropdownDto, ProductServiceProxy, UpdatePlanDto, UpdatePlanProductDto } from '@shared/service-proxies/service-proxies';
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
  planProduct:PlanProductDto=new PlanProductDto();
  data: PlanProductDto[] = [];
  plan:PlanDto=new PlanDto ();
  ColumnMode = ColumnMode;
 
  @Input() planId: number;
  @Output() savePlanProductList = new EventEmitter<PlanProductDto[]>();
  
  constructor(injector: Injector,
    private _productService: ProductServiceProxy,
    private _planService:PlanServiceProxy,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initPlan();
    this.initProducts();
    this.initProductsDropDown();

  }

  initProductsDropDown() {
    this._productService.getNameForDropdown().subscribe((response: ProductNameForDropdownDto[]) => {
      this.productsForDropDown = response;
    });
  }
  initProducts(){

  this._productService.getAll("","",0,1000).subscribe((response ) => {
    var result = response as ProductDtoPagedResultDto;
    this.products = result.items;
  
    });
 
  }
  initPlan() {
    this._planService.get(this.planId ).subscribe((response: PlanDto) => {
      this.plan = response;
      console.log(this.plan)
   
      // this.plan.planProducts.forEach(element => {
      // this.data.push(element);
      //  this.getProductName(element.productId);
      //   this.data = [...this.data]
      // });
    })

  }

  getProductName(id:number){
    this._productService.get(id).subscribe((response)=>{
      this.products.push(response);
    });
  
  }

  addToProductList()
  {
   
   
    if(this.planProduct.numberOfItems ==null || this.planProduct.productId == null || this.planProduct.priority==null){
      return;
    }

   
    else{

    if(this.planProduct.id==null){
    // this.getProductName(this.planProduct.productId)
    // this.planProduct.productId=this.planProduct.productId;
    // this.data.push(this.planProduct)
    // console.log(this.planId)
    this.planProduct.planId = this.planId;
    var product =this.products.filter(x=>x.id ==this.planProduct.productId)[0];
    this.planProduct.product= product;
    if(this.plan.planProducts.filter(x=>x.product.name ==this.planProduct.product.name).length >0){
      this.notify.error(this.l('Product is Already Exist'));
      return;
    }
    this.plan.planProducts.push(this.planProduct)
   
    this.planProduct = new PlanProductDto()
    this.plan.planProducts = [...this.plan.planProducts]
    // this.data = [...this.data]
    this.savePlanProductList.emit(this.plan.planProducts);
    this.saving = true;
  
      }
      else{
        let product=this.productsForDropDown.filter(x=>x.id==this.planProduct.productId)[0];

        this.planProduct.product.id = product.id;
        this.planProduct.product.name = product.name;
        this.plan.planProducts.push(this.planProduct)
        this.data.push(this.planProduct)
        this.planProduct = new PlanProductDto()
  
        // this.data = [...this.data]
        this.plan.planProducts = [...this.plan.planProducts]
        this.savePlanProductList.emit(this.plan.planProducts);
        console.log(    this.savePlanProductList)
        this.saving = true;
      }
    }
  }

 
  edit(row: PlanProductDto) {
   
    this.planProduct=new PlanProductDto();
    this.planProduct = row
    const index = this.plan.planProducts.indexOf(row);
 

    if (index !== -1) {
      // this.data.splice(index, 1);
      this.plan.planProducts.splice(index, 1);
    }
  }

  delete(row: PlanProductDto) {
    const index = this.plan.planProducts.indexOf(row);
    if (index !== -1) {
      this.plan.planProducts.splice(index, 1);
      console.log(this.plan.planProducts)
      this.savePlanProductList.emit(this.plan.planProducts);
    }
    

  }

}
