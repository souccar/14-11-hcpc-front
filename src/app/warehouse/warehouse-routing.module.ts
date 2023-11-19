import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WarehouseComponent } from './warehouse.component';
import { WarehouseMaterialComponent } from './warehouse-material/warehouse-material.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';



const routes: Routes = [{ 
  path: '', component: WarehouseComponent ,
  children:[
    {
      path: 'warehouseMaterial',
      component: WarehouseMaterialComponent,
      
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
