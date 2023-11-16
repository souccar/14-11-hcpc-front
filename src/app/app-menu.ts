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


  //Personnel
  // {
  //   icon: ' iconsminds-user',
  //   label: 'Personnel',
  //   to: `${adminRoot}/personnel`,
  //   subs: [
  //     {
  //       label: 'Employee',
  //       to: `${adminRoot}/personnel/employees`,
  //       icon: 'iconsminds-user',
  //     }
  //   ],
  // },
  //Production
  {
    icon: 'iconsminds-factory',
    label: 'Production',
    to: `${adminRoot}/production`,
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
        label: 'Formula',
        to: `${adminRoot}/production/formula`,
        icon: 'iconsminds-chemical',

      },
    ],
  },

  //Selling
  // {
  //   icon: 'iconsminds-target-market',
  //   label: 'Selling',
  //   to: `${adminRoot}/selling`,
  //   subs: [
  //     {
  //       icon: 'iconsminds-map2',
  //       label: 'Area',
  //       to: `${adminRoot}/selling/area`,
  //     },

  //     {
  //       icon: 'iconsminds-map-marker-2',
  //       label: 'SellingPoint',
  //       to: `${adminRoot}/selling/sellingpoint`,
  //     },

  //     {
  //       icon: 'simple-icon-people',
  //       label: 'Agent',
  //       to: `${adminRoot}/selling/agent`,
  //     },
  //     {
  //       icon: 'iconsminds-receipt-4',
  //       label: 'Sales',
  //       to: `${adminRoot}/selling/sales`,
  //     },
  //     {
  //       icon: 'iconsminds-newspaper',
  //       label: 'Plan',
  //       to: `${adminRoot}/selling/plan`,
  //     },
  //   ],
  // },
  //report
  // {
  //   icon: 'bi bi-file-text',
  //   label: 'Report',
  //   to: `${adminRoot}/report`,
  //   subs: [
  //     {
  //       icon: 'iconsminds-paper',
  //       label: 'Template',
  //       to: `${adminRoot}/report/template`,
  //     },

  //     {
  //       icon: 'bi bi-clipboard2-check',
  //       label: 'ReportBuilder',
  //       to: `${adminRoot}/report/reportbuilder`,
  //     },


  //   ],

  // },
 //Supplier
 {
  label: 'Supplier',
  to: `${adminRoot}/supplier`,
  icon: 'simple-icon-user',
  subs:[
    {
      label: 'supplier',
      to: `${adminRoot}/supplier/supplier`,
      icon: 'simple-icon-user',
    },
  ]
  // roles: [UserRole.Editor],
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
   //Setting
   {
    icon: 'simple-icon-settings',
    label: 'Settings',
    to: `${adminRoot}/settings`,
    subs: [
      {
        label: 'Unit',
        to: `${adminRoot}/settings/unit`,
        icon: 'iconsminds-scale',
      },


    ],
  },
];
export default data;
