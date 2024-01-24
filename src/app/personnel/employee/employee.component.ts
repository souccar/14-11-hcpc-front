import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IPageField } from '@app/layout/content-template/page-default/page-field';
import { BtSortableHeader, SortEvent } from '@shared/directives/bt-sortable-header.directive';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { EmployeeDto, EmployeeServiceProxy, FilterDto, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { DateParsingFlags } from 'ngx-bootstrap/chronos/create/parsing.types';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription, finalize } from 'rxjs';
import { FilterEmployeeDialogComponent } from './filter-employee/filter-employee-dialog.component';
import { locale } from 'moment-timezone';
import { SharedService } from '@shared/services/shared.service';


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends FullPagedListingComponentBase<EmployeeDto> implements OnInit {
  employees:EmployeeDto[] = [];
  fields = [
    { label: this.l('FullName'), type: 'compound', compoundValue: 'firstName,lastName' },
    { label: this.l('FirstName'), name: 'firstName', sortable: false, type: 'string' },
    { label: this.l('LastName'), name: 'lastName', sortable: true, type: 'string' },
    { label: this.l('Age'), name: 'age', sortable: true, type: 'number' },
    { label: this.l('DateOfBirth'), name: 'dateOfBirth', sortable: true, type: 'date', format: 'dd MM YYYY' },
  ];

  @ViewChild(FilterEmployeeDialogComponent) child!: FilterEmployeeDialogComponent;
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _employeeService: EmployeeServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.request.including = "Nationality";
    console.log(request)
    this._employeeService.read(request)
    .subscribe(result=>{
      this.employees = result.items;
      this.showPaging(result, pageNumber);
    })
  }
 
  showAddNewModal(){

  }

  showFilterDialog(status){
    if(status == 'clear_filter'){
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterEmployeeDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          filterInput: this.request.filtering,
        },
       class: 'modal-lg',
      }
    );
    filterDialog.content.onSave.subscribe((result:FilterDto) => {
      this.request.filtering = result;
      this._modalService.hide();
      this.refresh();
    });
  }
 
}




