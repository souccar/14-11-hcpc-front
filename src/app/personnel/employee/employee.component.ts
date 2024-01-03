import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Injector, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { EmployeeDto, EmployeeDtoPagedResultDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { DateParsingFlags } from 'ngx-bootstrap/chronos/create/parsing.types';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends PagedListingComponentBase<EmployeeDto> implements AfterViewInit {
  @ViewChild('table') tableElement: ElementRef;
  data: EmployeeDto[] = [];
  currentPage = 1;
  pageSize = 10;
  search = '';
  filter = '';
  orderBy = '';
  totalPage = 0;
  advancedFiltersVisible = false;
  title = this.l("Employee")
  columns = [
    { label: this.l('FirstName'),  name: 'firstName', sortable: true },
    { label: this.l('LastName'), name: 'lastName', sortable: true },
    { label: this.l('Age'), name: 'age', sortable: true },
    { label: this.l('DateOfBirth'), name: 'dateOfBirth', sortable: true },
  ];
  fields = [
    {name:'firstName', type:'string' },
    {name:'lastName', type:'string' },
    {name:'age', type:'number', template:'<span class="text-primary">$$</span>' },
    {name:'dateOfBirth', type:'date',format:'dd MMM YYYY' },
  ]
  table: string = '';
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _renderer: Renderer2,
    private _datePipe: DatePipe,
    private _employeeService: EmployeeServiceProxy) {
    super(injector);
  }
  ngAfterViewInit(): void {
    
  }
  // ngOnInit(): void {
  //   this.loadData(this.pageSize, this.currentPage, this.search, this.orderBy);
  // }

  getDataField(name, item) {
    debugger;
    var index = this.fields.findIndex(x=>x.name == name);
    if(index != -1){
      let value = '';
      const field = this.fields[index];
      if(field.type === 'date'){
        value = this._datePipe.transform(item, field.format);
        return value;
      }else{
        if(field.template){
          return field.template.replace("$$",item);
        }
      }
    }
    return item;
  }

  loadData(
    pageSize: number = 10,
    currentPage: number = 1,
    search: string = '',
    sortFields: string = ''): void {
    let request: PagedProductsRequestDto = new PagedProductsRequestDto();
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    request.keyword = search;
    request.sortFields = sortFields;
    request.skipCount = (currentPage - 1) * pageSize;
    request.maxResultCount = this.pageSize;
    this.list(request, this.pageNumber, () => { });
  }

  protected list(
    request: PagedProductsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.search;

    this._employeeService
      .getAll(
        request.keyword,
        request.sortFields,
        "",
        request.skipCount,
        request.MaxResultCount,
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: EmployeeDtoPagedResultDto) => {
        this.data = result.items;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
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

  pageChanged(event: any): void {
    this.loadData(this.pageSize, event.page, this.search, this.orderBy);
  }

  onChangePage(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any): void {
    this.loadData(this.pageSize, 1, this.search, item.value);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.pageSize, 1, val, this.orderBy);
  }
}

class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string;
  sortFields: string;
  MaxResultCount: number
}

