import { IPayments } from "./cart-types";

export interface IOrder {
    orderTotal: number,
    orderReceiverId: string | number,
    orderFeeShipping: number,
    orderContent: IPayments[];
}