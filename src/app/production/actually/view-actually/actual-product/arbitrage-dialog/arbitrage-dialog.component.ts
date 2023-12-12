import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'arbitrage-dialog',
  templateUrl: './arbitrage-dialog.component.html',
  styleUrls: ['./arbitrage-dialog.component.scss']
})
export class ArbitrageDialogComponent extends AppComponentBase {
  planProduct: PlanProductDto;

  tooltipData = {
    amountWasted:'قيمة المبلغ المهدور من عملية الإنتاج',
    produceCost:'تكلفة العبوات المنتجة حتى اليوم',
    totalSalesAmount:'مبلغ المبيع الإجمالي حسب عدد العبوات المنتجة',
    productArbitrage:'موازنة المنتج',
  };

  constructor(injector: Injector,public bsModalRef:BsModalRef){
    super(injector);
  }
  
}
