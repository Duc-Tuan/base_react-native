import { IGeneral } from "./product-types";

export interface ResponseCarts extends IGeneral {
    cartdata: ICartsData[];
}

export interface ICartsData {
    productId: string | number;
    code: string;
    _id: string | number;
    productimage?: string;
    productname?: string;
    qty: number;
    productprice: number;
    productpromotion?: number;
}

export interface ICarts extends ResponseCarts { }