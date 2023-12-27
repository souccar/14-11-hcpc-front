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
      console.log(result )
      this.material.id=result.id;
      this.material.name=result.name;
      this.material.code=result.code;
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


    const index = this.material.suppliers.length ;
    //list have one element at least
    if(index>0)
    {
      if ((this.material.suppliers[index-1].supplierId == null || this.material.suppliers[index-1].leadTime == null) ) {
        this.notify.error(this.l('FillSupplierAndLeadTimeFieldFirst'));
      }
      else{
        let materialSupplier = new UpdateMaterialSuppliersDto();
        materialSupplier.materialId=this.material.id;
        this.material.suppliers.push(materialSupplier);
      }
    }
    //if the list empty 
    else
    {
      let materialSupplier = new UpdateMaterialSuppliersDto();
      materialSupplier.materialId=this.material.id;
      this.material.suppliers.push(materialSupplier);
    }
  }
  removeMaterialSupplier (materialsupplier:UpdateMaterialSuppliersDto){
    const index =  this.material.suppliers.indexOf(materialsupplier, 0);
    if (index > -1) {
      this.material.suppliers.splice(index, 1);
    }
  }
   save(): void {

    if (this.material.suppliers.length < 1) {
      this.notify.error(this.l('AddOneSupplierAtLeast'));
    }
    else {
      this.saving = true;
      this.material.suppliers.forEach((element) =>
      element.id = 0
    );
      this._materialService.
      update(
          this.material
        )
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((result: any) => {

          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        });
    }

    this.saving = true;


   
  }

}
