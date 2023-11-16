import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateFormulaDto, FormulaServiceProxy, MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductNameForDropdownDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-formula-dialog',
  templateUrl: './create-formula-dialog.component.html',

})
export class CreateFormulaDialogComponent extends AppComponentBase {
  saving = false;
  formula = new CreateFormulaDto();
  materials: MaterialNameForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  products: ProductNameForDropdownDto [] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _formulaService: FormulaServiceProxy,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy ,
    private _productService: ProductServiceProxy  ,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initMaterials();
    this.initUnits();
    this.initProducts();
    }

  initMaterials() {
    this._materialService.getNameForDropdown().subscribe((recponce:MaterialNameForDropdownDto[]) => {
      console.log(recponce)
      this.materials = recponce;
    });
  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((recponce:UnitNameForDropdownDto[]) => {
      console.log(recponce)
      this.units = recponce;
    });
  }
  initProducts() {
    this._productService.getNameForDropdown().subscribe((recponce:ProductNameForDropdownDto[]) => {
      console.log(recponce)
      this.products = recponce;
    });
  }
  save(): void {

    this.saving = true;
    console.log(  this.formula)
    this._formulaService.
      create(
        this.formula
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {

        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });

  }

}
