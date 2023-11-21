import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormulaDto, FormulaServiceProxy, MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductDto, ProductNameForDropdownDto, ProductServiceProxy, UnitDto, UnitNameForDropdownDto, UnitServiceProxy, UpdateFormulaDto, UpdateProductDto } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-formula-dialog',
  templateUrl: './edit-formula-dialog.component.html',

})
export class EditFormulaDialogComponent extends AppComponentBase {
  saving = false;
  ColumnMode = ColumnMode;
  materials: MaterialNameForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  products: ProductNameForDropdownDto [] = [];
  data: UpdateFormulaDto[] = [];
  formula = new UpdateFormulaDto();
  product :UpdateProductDto=new UpdateProductDto();
  @Input() productId : number;
  @Output() saveFormulaList = new EventEmitter<UpdateFormulaDto []>();
  
  constructor(injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy ,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initProduct()
 
   
  }

  initProduct()
  {
    this._productService.get(this.productId).subscribe((response:ProductDto)=>{
      this.product=response;
      this.product.formulas.forEach(element => {
        this.initMaterials(element.materialId);
        this.initUnits(element.unitId);

        this.data.push(element)
        this.data=[...this.data]
      });
    })

  }

  initMaterials(id: number) {
    this._materialService.get(id).subscribe((response: MaterialDto) => {
      this.materials.push(response);

    });
  }
  initUnits(id: number) {
    this._unitService.get(id).subscribe((response: UnitDto) => {
      this.units.push(response);

    });
  }

  addToFormulaList() {
    
    this.data.push(this.formula)
    this.formula.init();
    this.data = [...this.data]
    this.saveFormulaList.emit(this.data);
   
  }
  edit(row: FormulaDto) {
    this.formula = row
    console.log(row)

    const index = this.data.indexOf(row);
    console.log(index);

    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  delete(row: FormulaDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
    }

  }



}
