import { Component, OnInit } from '@angular/core';
import { OutputRequestDto, OutputRequestServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-output-request-dialog',
  templateUrl: './view-output-request-dialog.component.html',
  styleUrls: ['./view-output-request-dialog.component.scss']
})
export class ViewOutputRequestDialogComponent  implements OnInit {

  data :OutputRequestDto=new OutputRequestDto();
  id: number;
  loaded=false;
  editable: true;
  constructor(public bsModalRef: BsModalRef,
    private _outputService:OutputRequestServiceProxy){}
  ngOnInit(): void {
    this.initOutputRequest()
  }

  initOutputRequest()
  {
     this._outputService.get(this.id).subscribe((response:OutputRequestDto)=>{
      this.data=response;
      console.log(this.data)
      this.loaded=true;
     })
  }


}
