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

export interface IPayments {
    _id: string | number,
    name?: string,
    image?: string,
    promotion?: number,
    qty: number,
    price: number,
}

export interface ICarts extends ResponseCarts { }