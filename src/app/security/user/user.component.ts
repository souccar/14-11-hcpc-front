import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { UserDtoPagedResultDto } from './../../../shared/service-proxies/service-proxies';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends PagedListingComponentBase<UserDto>  implements OnInit {
  displayMode = 'list';
  selectAllState = '';
  selected: UserDto[] = [];
  data: UserDto[] = [];
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
  title = this.l("Users");
  loading = false;
  itemOptionsOrders = [
    { label: this.l("Name"), value: "name" },
    { label: this.l("UserName"), value: "userName" },
  ];
  selectedCount = 0;
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _userService: UserServiceProxy,
    private _router: Router,
  ) {

    super(injector);
  }

  ngOnInit(): void {
    this.loadData(this.itemsPerPage, this.currentPage, this.search,this.isActive , this.orderBy);
  }

  loadData(pageSize: number = 10, currentPage: number = 1, search: string = '',isActive: boolean , sort_Field: string = undefined, sort_Desc: boolean = false): void {
    let request: PagedUsersRequestDto = new PagedUsersRequestDto();
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    request.keyword = search;
    request.sort_Field = sort_Field;
    request.sort_Desc = sort_Desc;
    request.isActive = isActive;
    request.skipCount = (currentPage - 1) * pageSize;
    request.maxResultCount = this.itemsPerPage;
    this.list(request, this.pageNumber, () => { });
  }
  roles: string;
  protected list(request: PagedUsersRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.search;

    this._userService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.MaxResultCount,
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: UserDtoPagedResultDto) => {
        this.data = result.items;
        this.totalItem = result.totalCount;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
        this.setSelectAllState();
      });
  }

  protected delete(entity: UserDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage',entity.userName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._userService.delete(entity.id).subscribe(() => {
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
    this.loadData(this.itemsPerPage, event.page, this.search,this.isActive , this.orderBy);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search,this.isActive , this.orderBy);
  }

  changeOrderBy(item: any): void {
    this.loadData(this.itemsPerPage, 1, this.search,this.isActive , item.value);
  }

  deleteItem(): void {
    if (this.selected.length == 0) {
      abp.message.info(this.l('YouHaveToSelectOneItemInMinimum'));
    }
    else {
      abp.message.confirm(
        this.l('UserDeleteWarningMessage', this.selected.length, 'Users'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._userService.delete(element.id).subscribe(() => {
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
    this._modalService.show(
      CreateUserComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-xl',
      }
    ).onHide.subscribe(() => {
      this.refresh();
    });
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

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val,this.isActive , this.orderBy);
  }

  viewButton(id: number) {
    // this._modalService.show(
    //   ViewRoleComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //     class: 'modal-xl',
    //   }
    // );
  }

  editButton(id: number): void {
    this._modalService.show(
      EditUserComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-xl',
        initialState: {
          id: id,
        },
      }
    ).onHide.subscribe(() => {
      this.refresh();
    });
  }
}

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean;
  sort_Field: string;
  sort_Desc: boolean;
  MaxResultCount: number
}
