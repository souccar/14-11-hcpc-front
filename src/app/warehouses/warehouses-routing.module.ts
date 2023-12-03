import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WarehousesComponent } from './warehouses.component';
import { WarehouseMaterialComponent } from './warehouse-material/warehouse-material.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { OutputRequestComponent } from './output-request/output-request.component';



const routes: Routes = [{
  path: '', component: WarehousesComponent ,
  children:[
    {
      path: 'warehouse',
      component: WarehouseComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'warehouseMaterial',
      component: WarehouseMaterialComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
        {
      path: 'outputRequest',
      component: OutputRequestComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },







  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
