import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowComponent } from './work-flow.component';
import { WorkFlowRoutingModule } from './work-flow-routing.module';
import { LayoutModule } from '@app/layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { CreateWorkflowDialogComponent } from './create-workflow/create-workflow-dialog.component';
import { FormsModule } from '@angular/forms';
import { StepsModule } from './steps/steps.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    WorkFlowComponent,
    CreateWorkflowDialogComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    WorkFlowRoutingModule,
    StepsModule
  ]
})
export class WorkFlowModule { }
