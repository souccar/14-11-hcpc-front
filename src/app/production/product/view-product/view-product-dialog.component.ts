import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
})
export class ViewProductDialogComponent implements OnInit {

  data :any;
  // data = new ReadProductDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,){}
  ngOnInit(): void {
  }

}