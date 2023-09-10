import { IGeneral } from './product-types';

/* eslint-disable prettier/prettier */
export interface ResponseAuthen {
    token: string;
    data: IUser;
    status: boolean;
    body?: any;
}

export interface IUser extends IGeneral {
    createdAt?: string;
    updatedAt?: string;
    userAdrressDesc?: string;
    userCommune?: string;
    userDistrict?: string;
    userAge?: string;
    userEmail?: string;
    userName?: string;
    userGender?: string;
    userNickname?: string;
    userPhone?: string;
    userProvinceCity?: string;
    userStatus?: string;
    userImage?: string;
    userImageMulter?: string;
}
