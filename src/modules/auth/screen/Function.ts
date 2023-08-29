/* eslint-disable prettier/prettier */
import { IGeneral } from 'types/product-types';

export interface IFormLogin {
    useName: string;
    password: string;
}

export interface IFormRegister {
    email: string;
    useName: string;
    password: string;
    passwordCofirm: string;
}

export interface IUserGlobal extends IGeneral {
    useName: string;
    age: string;
    name: string;
    phone: string;
    gender: string;
    email: string;
    address: string;
    image: any;
    status: string;
    color?: string;
}
