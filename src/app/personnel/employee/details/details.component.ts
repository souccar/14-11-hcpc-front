import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'employee-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent  implements OnInit{
  @Input() employeeId ;
  constructor(   private _router: Router,){

  }
  ngOnInit(): void {
  
  }


  navigateToChildren(){
    this._router.navigate(['/app/personnel/children', this.employeeId]);

  }
}
