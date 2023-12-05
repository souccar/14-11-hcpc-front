import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateMaterialDto, MaterialDto, MaterialServiceProxy, SupplierDto, SupplierNameForDropdownDto, SupplierServiceProxy, UpdateMaterialDto, UpdateMaterialSuppliersDto, UpdateSupplierDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-material-dialog',
  templateUrl: './edit-material-dialog.component.html',

})
export class EditMaterialDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  material =  new UpdateMaterialDto ();
  suppliers: SupplierNameForDropdownDto[] = [];
  supplierIds:number[]=[]
  updateSupplier:UpdateMaterialSuppliersDto[]=[];
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
    this.initSupplier();
    this.initMaterial()
  }

  initSupplier(){
   this._supplierService.getNameForDropdown().subscribe((result:SupplierNameForDropdownDto[]) => {
    this.suppliers = result;
  });
  }

  initMaterial(){
    this._materialService.get(this.id).subscribe((result:MaterialDto) => {

      this.material.id=result.id;
      this.material.name=result.name;
      this.material.description=result.description;

     result.suppliers.forEach((item)=>{
      let supplier =new UpdateMaterialSuppliersDto();
      supplier.id=item.id,
      supplier.supplierId=item.supplier.id
      supplier.leadTime=item.leadTime

      this.material.suppliers.push(supplier)
      // this.supplierIds.push(item.supplier.id)
     });



    // var materialSuppliers : UpdateMaterialSuppliersDto[] = [];
    // result.suppliers.forEach(item=>{
    //   var updateMaterialSupplier = new UpdateMaterialSuppliersDto();
    //   updateMaterialSupplier.init({supplierId: item.supplier.id, id: item.id,leadTime:item.leadTime});
    //   materialSuppliers.push(updateMaterialSupplier);
    // });
   });
   }

   addMaterialSupplier (){
    let MaterialSuppliers  = new UpdateMaterialSuppliersDto ();
    MaterialSuppliers.materialId=this.material.id;
     this.material.suppliers .push(MaterialSuppliers );

  }
  removeMaterialSupplier (i:number){
      this.material.suppliers.splice(i,1);


  }

   save(): void {
    this.saving = true;
    // this.supplierIds.forEach((item)=>{
    //   let supplier =new UpdateMaterialSuppliersDto();
    //   supplier.id=item;

    // })
    console.log(this.material)
    this._materialService
      .update(
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
