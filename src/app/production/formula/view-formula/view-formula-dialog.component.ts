import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-formula-dialog',
  templateUrl: './view-formula-dialog.component.html',

})
export class ViewFormulaDialogComponent implements OnInit {

  data :any;
  // data = new ReadProductDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,){}
  ngOnInit(): void {
  }

}