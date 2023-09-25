/* eslint-disable prettier/prettier */
export interface IGeneral {
    _id: string | number;
    code: string;
    createdAt?: string;
    updatedAt?: string;
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
    totalElement?: number;
    currentPage: number;
    totalPage: number;
    pageSize: number;
}

export interface IProduct extends IGeneral {
    productCategory?: string;
    productImage?: string;
    productStatus?: string;
    productUnit?: string;
    productName?: string;
    productPrice?: number;
    productPromotion?: number;
    productQty?: number;
}
