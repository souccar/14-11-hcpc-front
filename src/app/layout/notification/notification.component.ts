import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { NotificationServiceProxy, UserNotification, UserNotificationState } from '@shared/service-proxies/service-proxies';
import { IFormattedUserNotification, UserNotificationHelper } from './UserNotificationHelper';
import * as moment from 'moment';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class NotificationComponent extends PagedListingComponentBase<UserNotification> {

  readStateFilter = '';
  selectAllState = '';
  data: any;
  totalItem = 0;
  totalPage = 0;
  currentPage = 1;
  itemsPerPage = 10;
  isLoading: boolean;
  endOfTheList = false;
  selected: UserNotification[] = [];
  ColumnMode = ColumnMode;

  constructor(
    injector: Injector,
    private _notificationService: NotificationServiceProxy,
    private _userNotificationHelper: UserNotificationHelper
  ) {
    super(injector);
  }

  reloadPage(): void {
    this.loadData();
  }

  loadData(pageSize: number = 10, currentPage: number = 1): void {
    let request: GetUserNotificationsInput = new GetUserNotificationsInput();
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    request.skipCount = (currentPage - 1) * pageSize;
    request.maxResultCount = this.itemsPerPage;
    this.list(request, this.pageNumber, () => { });
  }

  protected list(
    request: GetUserNotificationsInput,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._notificationService.getUserNotifications(
      this.readStateFilter === 'ALL' ? UserNotificationState._1 : UserNotificationState._0,
      request.maxResultCount,
      request.skipCount
    ).pipe(
      finalize(() => {
        finishedCallback();
      })
    )
      .subscribe((result) => {
        this.data = result.items;

        this.totalItem = result.totalCount;
        this.totalPage = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
      });
  }

  onSelect(item: UserNotification): void {
    const isSelected = this.selected.findIndex(x => x.id === item.id) > -1;
    if (isSelected) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
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

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page);
  }

  setAsRead(record: any): void {
    this.setNotificationAsRead(record, () => {
      this.reloadPage();
    });
  }

  isRead(record: any): boolean {
    return record.formattedNotification.state === 'READ';
  }

  fromNow(date: moment.Moment): string {
    return moment(date).fromNow();
  }

  formatRecord(record: any): IFormattedUserNotification {
    return this._userNotificationHelper.format(record, false);
  }

  formatNotification(record: any): string {
    const formattedRecord = this.formatRecord(record);
    return abp.utils.truncateStringWithPostfix(formattedRecord.text, 120);
  }

  formatNotifications(records: any[]): any[] {
    const formattedRecords = [];
    for (const record of records) {
      record.formattedNotification = this.formatRecord(record);
      formattedRecords.push(record);
    }
    return formattedRecords;
  }

  truncateString(text: any, length: number): string {
    return abp.utils.truncateStringWithPostfix(text, length);
  }

  setAllNotificationsAsRead(): void {
    this._userNotificationHelper.setAllAsRead(() => {
      this.loadData();
    });
  }

  openNotificationSettingsModal(): void {
    this._userNotificationHelper.openSettingsModal();
  }

  setNotificationAsRead(userNotification: UserNotification, callback: () => void): void {
    this._userNotificationHelper
      .setAsRead(userNotification.id, () => {
        if (callback) {
          callback();
        }
      });
  }

  protected delete(userNotification: UserNotification): void {
    this.message.confirm(
      this.l('NotificationDeleteWarningMessage'),
      this.l('AreYouSure'),
      (isConfirmed) => {
        if (isConfirmed) {
          this._notificationService.deleteNotification(userNotification.id)
            .subscribe(() => {
              this.reloadPage();
              this.notify.success(this.l('SuccessfullyDeleted'));
            });
        }
      }
    );
  }

  public getRowClass(formattedRecord: IFormattedUserNotification): string {
    return formattedRecord.state === 'READ' ? 'notification-read' : '';
  }

}

class GetUserNotificationsInput extends PagedRequestDto {
  state: UserNotificationState
}