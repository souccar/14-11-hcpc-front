import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMaterialDto, CreateMaterialSuppliersDto, MaterialServiceProxy, SupplierDto, SupplierNameForDropdownDto, SupplierServiceProxy, UpdateMaterialSuppliersDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-material-dialog',
  templateUrl: './create-material-dialog.component.html',

})
export class CreateMaterialDialogComponent extends AppComponentBase {
  saving = false;

  material =  new CreateMaterialDto();
  suppliers: SupplierNameForDropdownDto[] = [];
  supplierList: SupplierNameForDropdownDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
   private _materialService:MaterialServiceProxy,
   private _supplierService:SupplierServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.material.suppliers=[]
    this. initSupplier();
  }

  initSupplier(){

   this._supplierService.getNameForDropdown().subscribe((response:SupplierNameForDropdownDto[]) => {
    this.suppliers = response;
   
    

  });

  }
   save(): void {
    this.saving = true;
    console.log(this. supplierList)  
    // var materialSuppliers : CreateMaterialSuppliersDto[] = [];
    this.supplierList.forEach(element => {
      var creatMaterialSupplier = new CreateMaterialSuppliersDto();
        creatMaterialSupplier.init({supplierId: element.id});
        console.log( creatMaterialSupplier)  
        this.material.suppliers.push(creatMaterialSupplier);
    
    });
    
    this._materialService.
    create(
        this.material
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response:any) => {

          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
      });

  }

}
