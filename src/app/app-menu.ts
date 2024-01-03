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
  //Production
  {
    icon: 'iconsminds-factory',
    label: 'Production',
    to: `${adminRoot}/production`,
    subs: [
      {
        label: 'Plan',
        to: `${adminRoot}/production/plan`,
        icon: 'iconsminds-address-book-2',
      },
      {
        label: 'Actually',
        to: `${adminRoot}/production/diallyProduction`,
        icon: 'simple-icon-notebook',
      },
      {
        label: 'DailyProduction',
        to: `${adminRoot}/production/diallyProduction/list`,
        icon: 'simple-icon-clock',
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
        label: 'Stock',
        to: `${adminRoot}/warehouses/warehouseMaterial`,
        icon: 'iconsminds-shopping-basket',

      },
      {
      label: 'Warehouse',
      to: `${adminRoot}/warehouses/warehouse`,
      icon: 'iconsminds-fire-staion',

    },
    {
      label: 'OutputRequest',
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
        to: `${adminRoot}/settings/material`,
        icon: 'iconsminds-shopping-basket',

      },
      {
        label: 'Product',
        to: `${adminRoot}/settings/product`,
        icon: 'simple-icon-layers',

      },
      {
        label: 'Supplier',
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
        label: 'GeneralSetting',
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
        to: `${adminRoot}/security/role`,
        icon: 'iconsminds-lock-2',
      },
      {
        label: 'User',
        to: `${adminRoot}/security/user`,
        icon: 'iconsminds-business-man-woman',
      },

    ],
  },


];
export default data;
