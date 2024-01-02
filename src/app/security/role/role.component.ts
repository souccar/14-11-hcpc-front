import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { RoleDto, RoleDtoPagedResultDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { finalize } from 'rxjs';
import { ViewRoleComponent } from './view-role/view-role.component';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends PagedListingComponentBase<RoleDto>  implements OnInit{
  displayMode = 'list';
  selectAllState = '';
  selected: RoleDto[] = [];
  data: RoleDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  ColumnMode = ColumnMode;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOrder = { label: this.l("Name"), value: "name" };
  title = this.l("Roles");
  loading = false;
  itemOptionsOrders = [
    { label: this.l("Name"), value: "name" },
    { label: this.l("Description"), value: "description" },
  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _roleService: RoleServiceProxy,
    private _router: Router,
  ) {

    super(injector);
  }

  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  viewButton(id: number) {
    this._modalService.show(
      ViewRoleComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
        class: 'modal-xl',
      }
    );
  }

  editButton(id: number): void {
    this._router.navigate(['app/security/editRole',id]);
  }

  loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', sort_Field: string = undefined, sort_Desc: boolean = false): void {
    let request: PagedRolesRequestDto = new PagedRolesRequestDto();
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    request.keyword = search;
    request.sort_Field = sort_Field;
    request.sort_Desc = sort_Desc;
    request.skipCount = (currentPage - 1) * pageSize;
    request.maxResultCount = this.itemsPerPage;
    this.list(request, this.pageNumber, () => { });
  }

  deleteItem(): void {
    if (this.selected.length == 0) {
      abp.message.info(this.l('YouHaveToSelectOneItemInMinimum'));
    }
    else {
      abp.message.confirm(
        this.l('RoleDeleteWarningMessage', this.selected.length, 'Roles'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._roleService.delete(element.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              });
            });
          }
        }
      );
    }
  }

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  showAddNewModal(): void {
    this._router.navigate(['app/security/newRole']);
  }

  isSelected(p: any): boolean {
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }

  onSelect(item: any): void {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  protected list(request: PagedRolesRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.search;

    this._roleService
      .getAll(
        request.keyword,
        request.skipCount,
        request.MaxResultCount,
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoleDtoPagedResultDto) => {
        this.data = result.items;
        this.totalItem = result.totalCount;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
        this.setSelectAllState();
      });
  }

  protected delete(entity: RoleDto): void {
    abp.message.confirm(
      this.l('RoleDeleteWarningMessage',entity.displayName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._roleService.delete(entity.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  setSelectAllState(): void {
    if (this.selected.length === this.data.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any): void {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  }
}

class PagedRolesRequestDto extends PagedRequestDto {
  keyword: string;
  sort_Field: string;
  sort_Desc: boolean;
  MaxResultCount: number
}