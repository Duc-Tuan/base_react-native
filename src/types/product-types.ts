/* eslint-disable prettier/prettier */
export interface IGeneral {
    id: string | number;
    code: string;
}
export interface IOptions {
    value: string | number;
    label: string | number;
}

export interface IRouterTabsMenu {
    key: string;
    title: string;
}

export interface ResponseCommon<T> {
    paganition: Metadata;
    data: T[];
}

export interface Metadata {
    currentPage: number;
    totalPage: number;
    pageSize: number;
}
