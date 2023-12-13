import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { OutputRequestDto, OutputRequestServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'change-status',
  templateUrl: './change-status.component.html',
})
export class ChangeStatusComponent  extends AppComponentBase implements OnInit{
id:number;
outputRequest:OutputRequestDto=new OutputRequestDto();
constructor(
  injector: Injector,
  public bsModalRef: BsModalRef,
  private _outputRequestService: OutputRequestServiceProxy,
  ){

    super(injector);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

getOutputRequestById()
{
  this._outputRequestService.get(this.id).subscribe((result)=>{

    this.outputRequest=result;
  })
}
onchangeStatusToInProduction()
{
    this._outputRequestService.changeStatus(1,this.id).subscribe((result)=>{

      this.notify.info(this.l('changeSuccessfully'));
      this.bsModalRef.hide();
      location.reload();

    })
}

onchangeStatusToFinish()
{
    this._outputRequestService.changeStatus(2,this.id).subscribe((result)=>{

      this.notify.info(this.l('changeSuccessfully'));
      this.bsModalRef.hide();
      location.reload();

    })
}

}
