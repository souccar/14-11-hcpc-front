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
                    { path: 'plan', loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule) },
                    { path: 'supplier', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },
                    { path: 'warehouses', loadChildren: () => import('./warehouses/warehouses.module').then(m => m.WarehousesModule) },
                    { path: 'diallyProduction', loadChildren: () => import('./actually/actually.module').then(m => m.ActuallyModule) },
            

                ]
            },

        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
