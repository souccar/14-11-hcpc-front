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

  materialSuppliers :CreateMaterialSuppliersDto[]=[];
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

   this._supplierService.getNameForDropdown().subscribe((result:SupplierNameForDropdownDto[]) => {
    this.suppliers = result;

  });
  }
  addMaterialSupplier(){
    let materialSupplier = new CreateMaterialSuppliersDto();
    this.material.suppliers.push(materialSupplier);
     ( this.material.suppliers)
  }
  removeMaterialSupplier(i:number){
    this.material.suppliers.splice(i,1);
  }r

   save(): void {
    this.saving = true;
     (this. material)


    this._materialService.
    create(
        this.material
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result:any) => {

          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
      });

  }

}
