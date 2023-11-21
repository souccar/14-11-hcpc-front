import { Component, OnInit } from '@angular/core';
import { MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductDto, ProductServiceProxy, UnitDto, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
})
export class ViewProductDialogComponent implements OnInit {

  data :ProductDto=new ProductDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,
    private _productService:ProductServiceProxy){}
  ngOnInit(): void {
    this.initProduct()
  }

  initProduct()
  {
     this._productService.get(this.id).subscribe((response:ProductDto)=>{
       console.log(response);
      this.data=response;
      // this.data.formulas.forEach((item)=>{
      //   this.initMaterials(item.materialId)
      //   this.initUnits(item.unitId);
      // })


     })
  }


}
