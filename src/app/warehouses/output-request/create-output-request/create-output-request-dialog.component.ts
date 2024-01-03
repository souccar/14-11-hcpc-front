import { Component, ElementRef, EventEmitter, Injector, Output, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOutputRequestDto, CreateOutputRequestProductDto, CreateProductDto, OutputRequestMaterialDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanProductDto, PlanServiceProxy, ProductNameForDropdownDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { state } from '@angular/animations';
import { forEach } from 'lodash-es';
@Component({
  selector: 'create-output-request-dialog',
  templateUrl: './create-output-request-dialog.component.html',
})
export class CreateOutputRequestDialogComponent extends AppComponentBase {
  saving = false;

  planProductloaded=false;
  outputRequest: CreateOutputRequestDto = new CreateOutputRequestDto();
  plans: PlanNameForDropdownDto[] = [];
  planProducts: PlanProductDto[] = [];
  showItemIndex = 0;
  renderer: Renderer2;
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _outputRequestService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,
    private _planService: PlanServiceProxy,
    private _location: Location,
    private el: ElementRef,
    private rendererFactory: RendererFactory2
  ) {
    super(injector);
  }
  ngOnInit(): void {

    this.outputRequest.outputRequestMaterials = [];
    this.outputRequest.outputRequestProducts = [];
    this.initPlan();

  }

  backToAlloutputRequest() {
    this._location.back();
  }
  addOutputRequestMaterial(items: OutputRequestMaterialDto[]) {
    this.outputRequest.outputRequestMaterials = [...items];
  }
  initPlan() {
    this._planService.getActualPlansNameForDropdown().subscribe((result) => {
      this.plans = result;
    })
  }
  getProductFromPlan(id: number) {
    if (id != null) {
      this._planService.get(id).subscribe((result) => {
        this.planProducts = result.planProducts;
        this.planProductloaded=true;
      });
    }
  }
  onChangeOutputRequestProduct(items: PlanProductDto[]){
    this.outputRequest.outputRequestProducts = [];
    items.forEach(item=>{
      var outputRequestProduct = new CreateOutputRequestProductDto();
      outputRequestProduct.init({productId: item.productId});
      this.outputRequest.outputRequestProducts.push(outputRequestProduct);
    });
  }
  save(): void {
    if (this.outputRequest.outputRequestMaterials.length < 1) {
      this.notify.error(this.l('AddOneOutputRequestMaterialAtLeast'));
    }
      else if(this.outputRequest.title==null || this.outputRequest.planId==null || this.outputRequest.outputRequestProducts.length<1 )
      {
        this.notify.error(this.l('PleaseEnterTheRequiredFiled'));
      }

      else{
      this.saving = true;
      this._outputRequestService
        .create(
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
