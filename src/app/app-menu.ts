import { environment } from 'environments/environment';

const adminRoot = environment.adminRoot;

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  //roles?: UserRole[];
}

const data: IMenuItem[] = [


  // Dially Production
  {
    icon: ' simple-icon-notebook',
    label: 'Dially Production',
    to: `${adminRoot}/diallyProduction`,
    subs: [
      {
        label: 'Actually',
        to: `${adminRoot}/diallyProduction`,
        icon: 'simple-icon-notebook',
      },


    ],
  },
  //Production
  {
    icon: 'iconsminds-factory',
    label: 'Production',
    to: `${adminRoot}/production`,
    subs: [
      {
        label: 'Plan',
        to: `${adminRoot}/plan`,
        icon: 'simple-icon-notebook',
      },
    ],
  },

  //Warehouse
  {
    label: 'Warehouses',
    to: `${adminRoot}/warehouses`,
    icon: 'iconsminds-factory-1',
    subs: [
      {
        label: 'Stok',
        to: `${adminRoot}/warehouses/warehouseMaterial`,
        icon: 'iconsminds-shopping-basket',

      },
      {
      label: 'Warehouse',
      to: `${adminRoot}/warehouses/warehouse`,
      icon: 'iconsminds-fire-staion',

    },
    {
      label: 'Output Requests',
      to: `${adminRoot}/warehouses/outputRequest`,
      icon: 'iconsminds-check',

    },
    ]
    // roles: [UserRole.Editor],
  },
  //Setting
  {
    icon: 'simple-icon-settings',
    label: 'Settings',
    to: `${adminRoot}/settings`,
    subs: [
      {
        label: 'Material',
        to: `${adminRoot}/production/material`,
        icon: 'iconsminds-shopping-basket',

      },
      {
        label: 'Product',
        to: `${adminRoot}/production/product`,
        icon: 'simple-icon-layers',

      },
      {
        label: 'supplier',
        to: `${adminRoot}/settings/supplier`,
        icon: 'simple-icon-user',
      },
      {
        label: 'Unit',
        to: `${adminRoot}/settings/unit`,
        icon: 'iconsminds-scale',
      },
      {
        label: 'Transfer',
        to: `${adminRoot}/settings/transfer`,
        icon: 'iconsminds-synchronize',
      },
      {
        label: 'general Setting',
        to: `${adminRoot}/settings/generalsetting`,
        icon: 'simple-icon-globe',
      },


    ],
  },
  //Security
  {
    icon: 'iconsminds-security-settings',
    label: 'Security',
    to: `${adminRoot}/security`,
    subs: [
      {
        label: 'Role',
        to: `${adminRoot}/security/roles`,
        icon: 'iconsminds-lock-2',
      },
      {
        label: 'User',
        to: `${adminRoot}/security/users`,
        icon: 'iconsminds-business-man-woman',
      },

    ],
  },


];
export default data;
