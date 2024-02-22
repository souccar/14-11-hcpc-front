import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from 'lodash-es';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() ParentId;
  @Input() data: DetailsData[];
  disabled:boolean=true;
  col_numbe:number;
  constructor(private _router: Router,) {
  }

  ngOnInit(): void {
    this.col_numbe=toInteger(12/this.data.length) ;
  }

  navigateToChildren(route: string) {
 
    if(this.ParentId)
    { console.log("sdsdsdsdds")
      this._router.navigate([route, this.ParentId]);}

    }
}

export class DetailsData {
  icon: string;
  label: string;
  destinationRoute: string;
}
