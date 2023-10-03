import { IOptions } from "types/product-types";
import { IOrderHistory, IOrderReceiver } from "../status/const";
import { checkNullish } from "utils/genal";
import dayjs from "dayjs";

export const renderAddress: (data: IOrderReceiver) => IOptions[] = (data: IOrderReceiver) => {
    return [
        {
            value: 'Tên người nhận:',
            label: checkNullish(data?.addressNameReceiver) ?? '---'
        },
        {
            value: 'Số điện thoại:',
            label: checkNullish(data?.addressPhoneReceive) ?? '---'
        },
        {
            value: 'Địa chỉ chi tiết:',
            label: checkNullish(data?.addressDetail) ?? '---'
        },
        {
            value: 'Ghi chú:',
            label: checkNullish(data?.addressTimeReceive) ?? '---'
        },
    ]
}

export const renderHistory: (data: IOrderHistory) => IOptions = (data: IOrderHistory) => {
    let value: string = '';
    switch (data?.status) {
        case 'ORDER':
            value = 'Đặt hàng';
            break;
        case 'PREPARE':
            value = 'Đang đóng gói';
            break;
        case 'BEING_SHIPPED':
            value = 'Đang vận chuyển';
            break;
        case 'DELIVERED':
            value = 'Đã giao hàng';
            break;
        default:
            value = 'Đặt hàng';
            break;
    }
    return {
        value,
        label: dayjs(data?.time).format('HH:mm:ss DD/MM/YYYY')
    };
}