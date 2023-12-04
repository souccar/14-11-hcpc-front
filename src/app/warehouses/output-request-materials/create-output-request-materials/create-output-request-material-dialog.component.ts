import { CreateOutputRequestMaterialDto, UnitNameForDropdownDto } from './../../../../shared/service-proxies/service-proxies';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'create-output-request-material-dialog',
  templateUrl: './create-output-request-material-dialog.component.html',
  styleUrls: ['./create-output-request-material-dialog.component.scss']
})
export class CreateOutputRequestMaterialDialogComponent extends AppComponentBase {
  saving = false;
  units: UnitNameForDropdownDto[] = [];
  productId: number;
  data: CreateOutputRequestMaterialDto[] = [];
  outputRequestMaterial = new CreateOutputRequestMaterialDto();
  ColumnMode = ColumnMode;

  saveDisabled = true
  unitsNames: string[] = [];
  materialNames: string[] = [];


  @Output() saveoutputRequestMaterialList = new EventEmitter<CreateOutputRequestMaterialDto[]>();

  constructor(injector: Injector,

    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {

    this.initUnits();

  }


  initUnits() {
    this._unitService.getNameForDropdown().subscribe((response: UnitNameForDropdownDto[]) => {
      this.units = response;
    });
  }
  getUnitName(id: number) {

    this._unitService.get(id).subscribe((response) => {
      console.log(response)
      this.unitsNames.push(response.name);
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
      this.outputRequestMaterial = new CreateOutputRequestMaterialDto()
    }



  }

  getUnitNameById(unitId) {
    return this.units.find(t => t.id == unitId).name;
  }

  edit(row: CreateOutputRequestMaterialDto) {
    this.outputRequestMaterial = row

    const index = this.data.indexOf(row);

    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  delete(row: CreateOutputRequestMaterialDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
    }

  }

}
