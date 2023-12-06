import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { OutputRequestDto, OutputRequestServiceProxy, PlanServiceProxy, UnitNameForDropdownDto, UnitServiceProxy, UpdateOutputRequestDto, UpdateOutputRequestMaterialDto, WarehouseMaterialNameForDropdownDto, WarehouseMaterialServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'edit-output-request-material-dialog',
  templateUrl: './edit-output-request-material-dialog.component.html',
  styleUrls: ['./edit-output-request-material-dialog.component.scss']
})
export class EditOutputRequestMaterialDialogComponent extends AppComponentBase {
  saving = false;
  units: UnitNameForDropdownDto[] = [];
  data: UpdateOutputRequestMaterialDto[] = [];
  outputRequestMaterial = new UpdateOutputRequestMaterialDto();
  outputRequest=new UpdateOutputRequestDto();
  ColumnMode = ColumnMode;
  warehouseMaterialCodes:WarehouseMaterialNameForDropdownDto[]=[]
  saveDisabled = true
  unitsNames: UnitNameForDropdownDto[] = [];
  materialNames: string[] = [];
  outputRequestId:number;
  warehouseCodes: WarehouseMaterialNameForDropdownDto[] = [];

  @Output() saveoutputRequestMaterialList = new EventEmitter<UpdateOutputRequestMaterialDto[]>();

  constructor(injector: Injector,
    private _warehouseMaterialService:WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _planService:PlanServiceProxy,
    public bsModalRef: BsModalRef,
    private _route:ActivatedRoute,
    private _outputRequest:OutputRequestServiceProxy


  ) {
    super(injector);
  }
  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.outputRequestId = params['id'];

    })
    this.initOutputRequestMaterial();
    this.initUnits();
    this.initWarehouseCode();

  }

  initOutputRequestMaterial() {

    this._outputRequest.get(this.outputRequestId).subscribe((response: OutputRequestDto) => {
      this.outputRequest = response;
      this.outputRequest.outputRequestMaterials.forEach(element => {
        this.data.push(element)
        this.getWarehouseCode(element.warehouseMaterialId)
        this.getUnitName(element.unitId)
        this.data = [...this.data]


      });
    })

  }
  getWarehouseCode(id: number) {


    this._warehouseMaterialService.get(id).subscribe((result) => {
      this.warehouseCodes.push(result);
    });


  }

  initUnits() {
    this._unitService.getNameForDropdown().subscribe((response: UnitNameForDropdownDto[]) => {
      this.units = response;
    });
  }
  initWarehouseCode()
  {
    this._warehouseMaterialService.getNameForDropdown().subscribe((result:WarehouseMaterialNameForDropdownDto[])=>{
      this.warehouseMaterialCodes=result;
    })
  }

  getUnitName(id: number) {

    this._unitService.get(id).subscribe((response) => {
      this.unitsNames.push(response);
    });
  }
  addToOutputRequestMaterialList() {

    if (this.outputRequestMaterial.warehouseMaterialId == null || this.outputRequestMaterial.quantity == null || this.outputRequestMaterial.unitId == null) {
      return;
    }
    else {
      this.data.push(this.outputRequestMaterial)

      this.data = [...this.data]
      this.saveoutputRequestMaterialList.emit(this.data);
      this.saving = true;
      this.getUnitName(this.outputRequestMaterial.unitId);
      this.getWarehouseCode(this.outputRequestMaterial.warehouseMaterialId)
      this.outputRequestMaterial = new UpdateOutputRequestMaterialDto()
    }



  }



  edit(row: UpdateOutputRequestMaterialDto) {
    this.outputRequestMaterial = row

    const index = this.data.indexOf(row);

    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  delete(row: UpdateOutputRequestMaterialDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.saveoutputRequestMaterialList.emit(this.data);
    }

  }
}
