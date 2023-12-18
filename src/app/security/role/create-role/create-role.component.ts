import { Component,Injector, OnInit} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateRoleDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { PermissionDtoListResultDto } from './../../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent extends AppComponentBase implements OnInit{
  saving = false;
  permissions: PermissionDtoListResultDto = new PermissionDtoListResultDto();
  role: CreateRoleDto = new CreateRoleDto();
  tempRoles:string[] = [];

  constructor(injector: Injector,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef,
    private _location: Location

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialPermissions();
  }

  initialPermissions() {
    this._roleService.getAllPermissions()
      .subscribe(result => {
        this.permissions = result;
      });
  }

  backToAllroles() {
    this._location.back();
  }

  save(): void {
    this.role.grantedPermissions = this.tempRoles;
    this.saving = true;
    this._roleService
      .create(
        this.role
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.backToAllroles();
      });
  }

  onChange(name){
    if(this.tempRoles.includes(name)){
      this.tempRoles = this.tempRoles.filter(s => !s.includes(name));
    }else{
      this.tempRoles.push(name);
    }
    
  }
}
