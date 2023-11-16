import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { TenantsComponent } from './tenants/tenants.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'production', loadChildren: () => import('./production/production.module').then(m => m.ProductionModule) },
                    { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
                    { path: 'supplier', component: SupplierComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard]  },
                ]
            },
           
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
