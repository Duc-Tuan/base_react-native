/* eslint-disable prettier/prettier */
import { IGeneral } from 'types/product-types';

export interface IFormLogin {
    usename: string;
    password: string;
}
export interface IRestPassword {
    id?: string;
    code?: string;
    email?: string;
    usename?: string;
    passwordNew?: string;
    passwordConfirm?: string;
}

export interface IFormRegister extends IFormLogin {
    userEmail: string;
    passwordCofirm: string;
}

export interface IChangePassword {
    passwordOld: string;
    passwordNew: string;
    passwordCofirm: string;
}

export interface ItemCart extends IGeneral {
    productId: string | number;
}
