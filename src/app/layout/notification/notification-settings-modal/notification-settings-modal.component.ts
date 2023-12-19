import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { GetNotificationSettingsOutput, NotificationServiceProxy, NotificationSubscriptionDto, UpdateNotificationSettingsInput } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'notification-settings-modal',
  templateUrl: './notification-settings-modal.component.html',
  styleUrls: ['./notification-settings-modal.component.scss']
})
export class NotificationSettingsModalComponent extends AppComponentBase {
  @ViewChild('modal') modal: ModalDirective;
  saving = false;
  settings: GetNotificationSettingsOutput;

  constructor(
      injector: Injector,
      public bsModalRef: BsModalRef,
      private _notificationService: NotificationServiceProxy
  ) {
      super(injector);
  }

  show() {
      this.getSettings(() => {
          this.modal.show();
      });
  }

  save(): void {
      const input = new UpdateNotificationSettingsInput();
      input.receiveNotifications = this.settings.receiveNotifications;
      input.notifications = _.map(this.settings.notifications,
          (n) => {
              let subscription = new NotificationSubscriptionDto();
              subscription.name = n.name;
              subscription.isSubscribed = n.isSubscribed;
              return subscription;
          });

      this.saving = true;
      this._notificationService.updateNotificationSettings(input)
          .pipe(finalize(() => this.saving = false))
          .subscribe(() => {
              this.notify.info(this.l('SavedSuccessfully'));
              this.close();
          });
  }

  close(): void {
      this.modal.hide();
  }

  private getSettings(callback: () => void) {
      this._notificationService.getNotificationSettings().subscribe((result: GetNotificationSettingsOutput) => {
        console.log(result)
          this.settings = result;
          callback();
      });
  }
}

