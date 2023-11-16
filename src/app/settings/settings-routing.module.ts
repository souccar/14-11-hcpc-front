import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UnitComponent } from './unit/unit.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';



const routes: Routes = [{ 
  path: '', component: SettingsComponent ,
  children:[
    {
      path: 'unit',
      component: UnitComponent,
      
      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    }
   
   
   
    
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
