import { ActivatedRoute, Route, Router } from '@angular/router';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { Component, Injector, OnInit, } from '@angular/core';
import { FullPagedRequestDto, WorkflowServiceProxy, WorkflowStepDto, WorkflowStepServiceProxy,  } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateStepsDialogComponent } from './create-steps/create-steps-dialog.component';
import { EditStepsDialogComponent } from './edit-steps/edit-steps-dialog.component';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
})
export class StepsComponent extends FullPagedListingComponentBase<WorkflowStepDto>  implements OnInit{

  steps: WorkflowStepDto[] = [];
  employeeId:number;
  loadDetails: boolean=false;
  fields = [
    { label: this.l('FullName'), type: 'compound', compoundValue: 'firstName,lastName' },
    { label: this.l('FirstName'), name: 'firstName', sortable: false, type: 'string' },
    { label: this.l('LastName'), name: 'lastName', sortable: true, type: 'string' },
    { label: this.l('DateOfBirth'), name: 'dateOfBirth', sortable: true, type: 'date', format: 'dd MM YYYY' },
  ];



  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _WorkflowStepService: WorkflowStepServiceProxy,
    public bsModalRef: BsModalRef,
    private _route:ActivatedRoute,
    private _router:Router) {
    super(injector);
  }

  ngOnInit(): void {
    this.getEmloyeeId();
    }
    getEmloyeeId() {
      this._route.params.subscribe(params => {
        this.employeeId = params['id']; 
        this.refresh()
      });
    }
  
  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    // this._WorkflowStepService.getByEmployeeId(this.employeeId)
    //   .subscribe(result => {
    //     this.steps = result;
    //     // this.showPaging(result, pageNumber);
    //   })
  }

  getEmployeeIdForSteps(id: number) {
    this.loadDetails=true
    this.employeeId=id;
  }

  showAddNewModal() {
    let createStepsDialog: BsModalRef;
    createStepsDialog = this._modalService.show(
      CreateStepsDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          employeeId:this.employeeId
        }

      }
    );
    createStepsDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editStepsDialog: BsModalRef;
    editStepsDialog = this._modalService.show(
      EditStepsDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id,
          employeeId:this.employeeId
        }

      }
    );
    editStepsDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showFilterDialog(status) {
    // if (status == 'clear_filter') {
    //   this.request.filtering = undefined;
    //   this.refresh();
    //   return;
    // }
    // let filterDialog: BsModalRef;
    // filterDialog = this._modalService.show(
    //   FilterEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       filterInput: this.request.filtering,
    //     },
    //     class: 'modal-lg',
    //   }
    // );
    // filterDialog.content.onSave.subscribe((result: FilterDto) => {
    //   this.request.filtering = result;
    //   this._modalService.hide();
    //   this.refresh();
    // });
  }


}
