import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Injector, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IPageField } from '@app/layout/content-template/page-default/page-field';
import { BtSortableHeader, SortEvent } from '@shared/directives/bt-sortable-header.directive';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { EmployeeDto, EmployeeDtoPagedResultDto, EmployeeServiceProxy, PagedEmployeeRequestDto } from '@shared/service-proxies/service-proxies';
import { DateParsingFlags } from 'ngx-bootstrap/chronos/create/parsing.types';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends PagedListingComponentBase<EmployeeDto> implements AfterViewInit {

  @ViewChildren(BtSortableHeader) headers: QueryList<BtSortableHeader>;

  data: EmployeeDto[] = [];
  displayMode = 'table';
  search = '';
  filter = '';
  orderBy = '';
  advancedFiltersVisible = false;
  title = this.l("Employee")
  fields = [
    { label: this.l('FullName'), type: 'compound', compoundValue: 'firstName,lastName' },
    { label: this.l('FirstName'), name: 'firstName', sortable: false, type: 'string' },
    { label: this.l('LastName'), name: 'lastName', sortable: true, type: 'string' },
    { label: this.l('Age'), name: 'age', sortable: true, type: 'number' },
    { label: this.l('DateOfBirth'), name: 'dateOfBirth', sortable: true, type: 'date', format: 'dd MM YYYY' },
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _employeeService: EmployeeServiceProxy) {
    super(injector);
  }
  ngAfterViewInit(): void {

  }


  // ngOnInit(): void {
  //   this.loadData(this.pageSize, this.pageNumber, this.search, this.orderBy);
  // }

  loadData(
    pageSize: number = 10,
    pageNumber: number = 1,
    search: string = '',
    sortFields: string = ''): void {
    let request: PagedEmployeeRequestDto = new PagedEmployeeRequestDto();
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    request.keyword = search;
    request.skipCount = (pageNumber - 1) * pageSize;
    request.maxResultCount = this.pageSize;
    this.list(request, this.pageNumber, () => { });
  }

  protected list(
    request: PagedEmployeeRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.search;

    this._employeeService
      .read(
        request
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: EmployeeDtoPagedResultDto) => {
        this.data = result.items;
        this.totalItems = result.totalCount;
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
      });
  }

  viewButton(id: number) {
    // this._modalService.show(
    //   ViewEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //   }
    // );
  }


  editButton(id: number): void {
    // let editEmployeeDialog: BsModalRef;
    // editEmployeeDialog = this._modalService.show(
    //   EditEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //     class: 'modal-lg',
    //   }
    // );
    // editEmployeeDialog.content.onSave.subscribe(() => {
    //   this.refresh();
    // });
  }

  protected delete(entity: EmployeeDto): void {

    abp.message.confirm(
      this.l('EmployeeDeleteWarningMessage', 'Employees'),
      undefined,
      (result: boolean) => {
        if (result) {

          this._employeeService.delete(entity.id).subscribe((recponce) => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  showAddNewModal(): void {
    // let createOrEditEmployeeDialog: BsModalRef;
    // createOrEditEmployeeDialog = this._modalService.show(
    //   CreateEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     class: 'modal-lg',

    //   }
    // );
    // createOrEditEmployeeDialog.content.onSave.subscribe(() => {
    //   this.refresh();
    // });
  }

  pageChanged(page: number): void {
    this.loadData(this.pageSize, page, this.search, this.orderBy);
  }

  onChangePage(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(sortFields): void {
    this.orderBy = sortFields;
    this.loadData(this.pageSize, 1, this.search, this.orderBy);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.pageSize, 1, val, this.orderBy);
  }
}

