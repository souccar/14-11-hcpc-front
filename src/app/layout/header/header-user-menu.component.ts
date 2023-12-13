import { Component, ChangeDetectionStrategy, HostListener, OnInit, Injector, NgZone } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { GetNotificationsOutput, NotificationServiceProxy, UserNotification } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { getThemeColor, setThemeColor } from 'app/utils/util';
import * as _ from 'lodash';
import { IFormattedUserNotification, UserNotificationHelper } from '../notification/UserNotificationHelper';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent extends AppComponentBase implements OnInit {
  isDarkModeActive = false;
  isFullScreen = false;
  displayName = "";
  notifications: IFormattedUserNotification[] = [];
  public unreadNotificationCount: number = 0;

  constructor(
    private _authService: AppAuthService,
    private _session: AppSessionService,
    private _notificationService: NotificationServiceProxy,
    private _userNotificationHelper: UserNotificationHelper,
    injector: Injector,
    public _zone: NgZone) {

    super(injector);
    this.isDarkModeActive = getThemeColor().indexOf('dark') > -1 ? true : false;

  }
  ngOnInit(): void {
    this.displayName = this.displayName = this._session.user.name;
    //SignalRAspNetCoreHelper.initSignalR();
    this.registerToEvents();
    this.loadNotifications();


  }
  onDarkModeChange(event): void {
    let color = getThemeColor();
    if (color.indexOf('dark') > -1) {
      color = color.replace('dark', 'light');
    } else if (color.indexOf('light') > -1) {
      color = color.replace('light', 'dark');
    }
    setThemeColor(color);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
  fullScreenClick(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }



  @HostListener('document:fullscreenchange', ['$event'])
  handleFullscreen(event): void {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }

  logout(): void {
    this._authService.logout();
  }



  loadNotifications(): void {
    this._notificationService.getUserNotifications(0, 10, 0).subscribe(result => {
      this.unreadNotificationCount = result.unreadCount;
      this.notifications = [];
      _.forEach(result.items, (item: UserNotification) => {
        this.notifications.push(this._userNotificationHelper.format(<any>item));
      });
    });
  }

  registerToEvents() {
    let self = this;
    function onNotificationReceived(userNotification) {
      self._userNotificationHelper.show(userNotification);
      self.loadNotifications();
    }

    abp.event.on('abp.notifications.received', userNotification => {
      self._zone.run(() => {
        onNotificationReceived(userNotification);
      });
    });

    function onNotificationsRefresh() {
      self.loadNotifications();
    }

    abp.event.on('app.notifications.refresh', () => {
      self._zone.run(() => {
        onNotificationsRefresh();
      });
    });

    function onNotificationsRead(userNotificationId) {
      self.loadNotifications();
      for (let i = 0; i < self.notifications.length; i++) {
        if (self.notifications[i].userNotificationId === userNotificationId) {
          self.notifications[i].state = 'READ';
        }
      }

      self.unreadNotificationCount.unreadCount -= 1;
    }

    abp.event.on('app.notifications.read', userNotificationId => {
      self._zone.run(() => {
        onNotificationsRead(userNotificationId);
      });
    });
  }

  setAllNotificationsAsRead(): void {
    this._userNotificationHelper.setAllAsRead();
  }

  openNotificationSettingsModal(): void {
    this._userNotificationHelper.openSettingsModal();
  }

  setNotificationAsRead(userNotification: IFormattedUserNotification): void {
    this._userNotificationHelper.setAsRead(userNotification.userNotificationId);
  }

  gotoUrl(url): void {
    if (url) {
        location.href = url;
    }
  }
}
export class Notifications{
  totalCount:number;
  unreadCount:number;
  notifications:UserNotification[];
}
