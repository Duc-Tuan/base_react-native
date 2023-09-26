import { IGeneral, IOptions } from 'types/product-types';
/* eslint-disable prettier/prettier */
export interface ILocation extends IGeneral {
    addressNameReceiver: string;
    addressOrganReceive: string;
    addressPhoneReceive: string;
    addressTimeReceive: string;
    addressDetail: string;
    addressWards: string;
    addressVillage: string;
    addressDistrict: string;
    addressCity: string;
    addressDefault: boolean;
    address_useId: string;
}

export const optionsOrgan: IOptions[] = [
    {
        value: 1,
        label: 'Nhà riêng',
    },
    {
        value: 2,
        label: 'Công ty',
    },
    {
        value: 3,
        label: 'Khác',
    },
];
