import { IUserGlobal } from 'modules/auth/screen/Function';
import Colors from 'themes/Color';
import { IOptions } from 'types/product-types';
/* eslint-disable prettier/prettier */
export interface ICarts {
    id: string | number;
    name: string;
    image: string;
    qty: number;
    price: number;
    promotion: number;
}
export interface ILocation {
    code: string;
    default: boolean;
    item: ILocationDetail;
}
export interface ILocationDetail {
    Wards: string;
    village: string;
    District: string;
    city: string;
    addressDetail: string;
    phone: string;
    organ: string;
    deliveryTime: string;
    default?: boolean;
}

export const dataCarts: ICarts[] | [] = [
    {
        id: 1,
        name: 'Sản phẩm 1',
        image: require('assets/images/app.png'),
        qty: 1,
        price: 100000,
        promotion: 10,
    },
    {
        id: 2,
        name: 'Sản phẩm 2',
        image: require('assets/images/app.png'),
        qty: 2,
        price: 100000,
        promotion: 10,
    },
    {
        id: 3,
        name: 'Sản phẩm 3',
        image: require('assets/images/app.png'),
        qty: 3,
        price: 300000,
        promotion: 10,
    },
    {
        id: 4,
        name: 'Sản phẩm 4',
        image: require('assets/images/app.png'),
        qty: 4,
        price: 400000,
        promotion: 10,
    },
    {
        id: 5,
        name: 'Sản phẩm 5',
        image: require('assets/images/app.png'),
        qty: 5,
        price: 400000,
        promotion: 10,
    },
    {
        id: 6,
        name: 'Sản phẩm6',
        image: require('assets/images/app.png'),
        qty: 1,
        price: 400000,
        promotion: 10,
    },
    {
        id: 7,
        name: 'Sản phẩm 7',
        image: require('assets/images/app.png'),
        qty: 2,
        price: 120000,
        promotion: 10,
    },
    {
        id: 8,
        name: 'Sản phẩm 8',
        image: require('assets/images/app.png'),
        qty: 2,
        price: 120000,
        promotion: 10,
    },
    {
        id: 9,
        name: 'Sản phẩm 9',
        image: require('assets/images/app.png'),
        qty: 2,
        price: 120000,
        promotion: 10,
    },
    {
        id: 10,
        name: 'Sản phẩm 10',
        image: require('assets/images/app.png'),
        qty: 2,
        price: 120000,
        promotion: 10,
    },
];

export const dataLocation: ILocation[] = [
    {
        code: 'DC00001',
        default: true,
        item: {
            village: '',
            Wards: 'Quảng Nghiệp',
            District: 'Tứ Kỳ',
            city: 'Hải Dương',
            addressDetail: '1 - Quảng Nghiệp - Tứ Kỳ - Hải Dương',
            phone: '0123456789',
            organ: 'Nhà riêng',
            deliveryTime: 'Các ngày trong tuần',
        },
    },
    {
        code: 'DC00002',
        default: false,
        item: {
            village: '',
            Wards: 'Quảng Nghiệp',
            District: 'Tứ Kỳ',
            city: 'Hải Dương',
            addressDetail: '2 - Quảng Nghiệp - Tứ Kỳ - Hải Dương',
            phone: '0123456789',
            organ: 'Cty',
            deliveryTime: 'thứ 2 - thứ 6, 8h00 - 17h30',
        },
    },
    {
        code: 'DC00003',
        default: false,
        item: {
            village: '',
            Wards: 'Quảng Nghiệp',
            District: 'Tứ Kỳ',
            city: 'Hải Dương',
            addressDetail: '3 - Quảng Nghiệp - Tứ Kỳ - Hải Dương',
            phone: '0123456789',
            organ: 'Cty',
            deliveryTime: 'thứ 2 - thứ 7, 8h00 - 17h30',
        },
    },
];

export const dataUser: IUserGlobal = {
    id: 1,
    code: 'US00001',
    useName: 'nhincaiconcu',
    name: 'Mr.Tuan',
    phone: '0123456789',
    gender: 'Nam',
    email: 'phamductuan26032002@gmail.com',
    address: 'Quảng Nghiệp - Tứ Kỳ - Hải Dương',
    image: require('assets/images/avt.jpg'),
    status: 'active',
    age: '26/03/2002',
    color: Colors.primary,
};

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
