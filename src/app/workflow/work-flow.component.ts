import { Component, Injector, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterDto, FullPagedRequestDto, WorkflowDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWorkflowDialogComponent } from './create-workflow/create-workflow-dialog.component';

@Component({
  selector: 'work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss']
})
export class WorkFlowComponent  extends FullPagedListingComponentBase<WorkflowDto> implements OnInit{
  fields = [
    { label: this.l('Name'), name: 'name', sortable: true, type: 'string' },

  ];

  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error('Method not implemented.');
  }
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'sales', name: 'Sales' },
    { prop: 'stock', name: 'Stock' },
    { prop: 'category', name: 'Category' },
    { prop: 'id', name: 'Id' }
  ];
  itemsPerPage = 10;
  itemOptionsPerPage = [5, 10, 20];
  selected = [];
  selectAllState = '';
  itemOrder = 'Title';
  itemOptionsOrders = ['Title', 'Category', 'Status', 'Label'];
  displayOptionsCollapsed = false;

  todoItems: any[] = [{
    name:'reem',
    age:24,
  }];

  // @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewTodoModalComponent;

  constructor(injector: Injector,
    private renderer: Renderer2,
    private _modalService: BsModalService,
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'right-menu');
    this.getItems();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'right-menu');
  }

  getItems(): void {
    // this.todoService.getTodoItems()
    //   .subscribe(items => {
    //     this.todoItems = items;
    //   });
  }

  showAddNewModal() {
    let createWorkflowDialog: BsModalRef;
    createWorkflowDialog = this._modalService.show(
      CreateWorkflowDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createWorkflowDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  isSelected(p: any) {
    // return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: any): void {
    // if (this.isSelected(item)) {
    //   this.selected = this.selected.filter(x => x.id !== item.id);
    // } else {
    //   this.selected.push(item);
    // }
    // this.setSelectAllState();
  }

  setSelectAllState(): void {
    if (this.selected.length === this.todoItems.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAll($event): void {
    if ($event.target.checked) {
      this.selected = [...this.todoItems];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  showFilterDialog(status) {
    // if (status == 'clear_filter') {
    //   this.request.filtering = undefined;
    //   this.refresh();
    //   return;
    // }
    // let filterDialog: BsModalRef;
    // filterDialog = this._modalService.show(
    //   FilterWorkFlowDialogComponent,
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
