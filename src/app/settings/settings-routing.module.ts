import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UnitComponent } from './unit/unit.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { TransferComponent } from './Transfer/transfer.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { SupplierComponent } from '@app/supplier/supplier.component';



const routes: Routes = [{
  path: '', component: SettingsComponent,
  children: [
    {
      path: 'supplier',
      component: SupplierComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'unit',
      component: UnitComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'transfer',
      component: TransferComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    }
    ,
    {
      path: 'generalsetting',
      component: GeneralSettingComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
