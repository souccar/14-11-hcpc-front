import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-material-dialog',
  templateUrl: './view-material-dialog.component.html',

})
export class ViewMaterialDialogComponent implements OnInit {

  data :any;
  // data = new ReadProductDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,){}
  ngOnInit(): void {
  }

}
