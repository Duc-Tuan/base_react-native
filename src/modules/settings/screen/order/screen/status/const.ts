import { IGeneral } from "types/product-types";

export interface IOrders extends IGeneral {
    orderTotal: number;
    orderFeeShipping: number;
    orderContent: IOrderContent[],
    orderHistory: IOrderHistory[],
    orderSatus: string,
    orderPaymentMethods: {
        method: string,
        status: boolean,
        date: string,
    },
    orderNotif: string,
    orderReceiver: IOrderReceiver
}

export interface IOrderHistory {
    status: string,
    time: string,
}


export interface IOrderContent {
    _id: string,
    name: string,
    image: string,
    promotion: number,
    qty: number,
    price: number,
}

export interface IOrderReceiver {
    addressCity: string,
    addressDetail: string,
    addressDistrict: string,
    addressNameReceiver: string,
    addressOrganReceive: string,
    addressPhoneReceive: string,
    addressTimeReceive: string,
    addressVillage: string,
    addressWards: string,
}