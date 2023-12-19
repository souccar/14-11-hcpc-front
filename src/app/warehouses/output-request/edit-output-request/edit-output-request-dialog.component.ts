import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { OutputRequestMaterialDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanProductDto, PlanProductMaterialDto, PlanServiceProxy, ProductDto, ProductNameForDropdownDto, ProductServiceProxy, UpdateOutputRequestDto, UpdateOutputRequestProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { element } from 'protractor';
@Component({
  selector: 'edit-output-request-dialog',
  templateUrl: './edit-output-request-dialog.component.html',
  styleUrls: ['./edit-output-request-dialog.component.scss']
})
export class EditOutputRequestDialogComponent extends AppComponentBase {
  saving = false;
  planProductloaded = false;
  outputRequest: UpdateOutputRequestDto = new UpdateOutputRequestDto();
  plans: PlanNameForDropdownDto[] = [];
  selectedOutputRequestProducts: ProductNameForDropdownDto[] = [];
  planProducts: ProductNameForDropdownDto[] = [];
  id: number;
  showItemIndex = 0;
  products: ProductDto[] = [];
  allProducts :  ProductNameForDropdownDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _outputRequestService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,
    private _planService: PlanServiceProxy,
    private _productService: ProductServiceProxy,
    private _router: ActivatedRoute,
    private _location: Location
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // this.outputRequest.outputRequestMaterials = [];
    this.allProducts=[]
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.initProduct();
    this.initPlan();
    this.initOutputRequest(this.id);
  }
  backToAlloutputRequest() {
    this._location.back();
  }
  onChangeOutputRequestProducts(items) {

    this.selectedOutputRequestProducts = items;

  }
  addOutputRequestMaterial(items: OutputRequestMaterialDto[]) {
    this.outputRequest.outputRequestMaterials = [...items];
  }

  initOutputRequest(id) {
    this.selectedOutputRequestProducts = [];
    this._outputRequestService.getForEdit(id).subscribe((result) => {

      this.outputRequest = result;
      this.onChangePlan(result.planId);
      result.outputRequestProducts.forEach(element => {
      this.getSelectedProduct(element.productId);

      });
      this.planProductloaded=true;
    });

  }
  initPlan() {
    this._planService.getActualPlansNameForDropdown().subscribe((result) => {
      this.plans = result;
    });
  }
  getSelectedProduct(id){
    const prod = this.allProducts.find(x => x.id == id);

    if (prod) {
      var selectedProduct = new ProductNameForDropdownDto();
       selectedProduct.init({ id: prod.id, name: prod.name });
      this.selectedOutputRequestProducts.push(selectedProduct);

    }
  }
    initProduct(){
    this._productService.getNameForDropdown().subscribe((result) => {
    this.allProducts=result;

    });
}


  onChangePlan(id: number) {
    if (id != null) {
      this._planService.getProductsOfPlan(id).subscribe((result) => {
        this.planProducts = result;
      });
    }
  }

 addProduct(product) {
    const tempObj = this.selectedOutputRequestProducts.find(x => x.id == product.id);
    if (!tempObj ) {
      this.selectedOutputRequestProducts.push(product);
    }
  }
  onRemoveallProducts()
  {
    this.selectedOutputRequestProducts = [];

  }
  onRemoveProduct(product){

    const tempObj = this.selectedOutputRequestProducts.findIndex(x => x.id == product.id);
    if (tempObj!=-1 ) {
      this.selectedOutputRequestProducts.splice(tempObj,1);

    }
  }
  save(): void {

    console.log(this.outputRequest)
      if (this.outputRequest.outputRequestMaterials.length < 1) {
      this.notify.error(this.l('Add One output Request Material at least'));
      }
      else if(this.outputRequest.title==null || this.outputRequest.planId==null || this.outputRequest.outputRequestProducts.length<1 )
      {
        this.notify.error(this.l('Please Enter the required filed !!!!'));
      }
      else{
      console.log(this.outputRequest)
      this.saving = true;
      this.outputRequest.outputRequestProducts=[]
      this.selectedOutputRequestProducts.forEach(obj1 => {
          var selectProduct=new UpdateOutputRequestProductDto()
          selectProduct.init({id:0,productId:obj1.id})
          this.outputRequest.outputRequestProducts.push(selectProduct);
      });
      this._outputRequestService
        .update(
          this.outputRequest
        )
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((response: any) => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.onSave.emit();
          this.backToAlloutputRequest();
        });
    }
  }




}
