export interface IPageField{
    label: string;
    type: string;
    name: string | undefined;
    compoundValue: string | undefined;
    templateValue: string | undefined;
    format: string | undefined;
    sortable: boolean;
    hidden: boolean | undefined;
}