import { ILocation } from "assets/data";
import { checkNullish } from "utils/genal";

export type menuSub = {
    title: string,
    content: any
}

export const renderAddress: (data: ILocation) => menuSub[] = (data: ILocation) => {
    return [
        {
            title: 'Người nhận:',
            content: checkNullish(data?.addressNameReceiver) ?? '---'
        },
        {
            title: 'Số điện thoại:',
            content: checkNullish(data?.addressPhoneReceive) ?? '---'
        },
        {
            title: 'Địa chỉ chi tiết:',
            content: checkNullish(data?.addressDetail) ?? '---'
        },
    ]
}