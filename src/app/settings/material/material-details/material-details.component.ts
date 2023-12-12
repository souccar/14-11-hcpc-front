import { Component, OnInit } from '@angular/core';
import { MaterialDetailDto, MaterialDto, MaterialServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'material-details',
  templateUrl: './material-details.component.html',

})
export class MaterialDetailsComponent implements OnInit {
  editable: true;
  isLoaded:boolean=false;
  id:number;
  ColumnMode = ColumnMode;
  data:MaterialDetailDto=new MaterialDetailDto();
  constructor(public bsModalRef: BsModalRef,
    private _materialService:MaterialServiceProxy){}

  ngOnInit(): void {
   this.getMaterialDetails()
  }

  getMaterialDetails()
  {
    this._materialService.getMaterialDetails(this.id).subscribe((result:MaterialDetailDto)=>{
      this.data=result;
      console.log(this.data)
      this.isLoaded=true;
    })
  }
}
