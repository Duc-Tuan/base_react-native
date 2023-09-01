import { IGeneral } from 'types/product-types';

export interface IInfoShop extends IGeneral {
  phone: string;
  email: string;
  address: string;
  timeOpen: string;
  nameShop: string;
}

export const dataInfoShop: IInfoShop = {
  id: 1,
  code: 'SHP00001',
  nameShop: 'Chef',
  phone: '0934746487',
  email: 'phamductuan@gmail.com',
  address: 'Quảng Nghiệp - Tứ Kỳ - Hải Dương',
  timeOpen: 'Tất cả các ngày trong tuần 24/7',
};
