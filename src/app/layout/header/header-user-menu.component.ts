import { Component, ChangeDetectionStrategy, HostListener, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppSessionService } from '@shared/session/app-session.service';
import { getThemeColor, setThemeColor } from 'app/utils/util';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent extends AppComponentBase implements OnInit{
  isDarkModeActive = false;
  isFullScreen = false;
  displayName = "";

  constructor(private _authService: AppAuthService,private _session:AppSessionService, injector: Injector,) {

    super(injector);
    this.isDarkModeActive = getThemeColor().indexOf('dark') > -1 ? true : false;

  }
  ngOnInit(): void {
    this.displayName = this.displayName = this._session.user.name;
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
}
