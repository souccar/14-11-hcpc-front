import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-supplier-dialog',
  templateUrl: './view-supplier-dialog.component.html',

})
export class ViewSupplierDialogComponent implements OnInit {

  data :any;
  // data = new ReadProductDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,){}
  ngOnInit(): void {
  }

}
