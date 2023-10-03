/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';
import { IRestPassword } from 'modules/auth/screen/Function';
import { IUser } from 'types/auth-types';

const urlname: string = 'auths';

const ApiAuths = {
    async login() {
        try {
            const res = await httpRequest.post(`${urlname}/login`);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    // Cập nhật thông tin người dùng
    async updateInfo(data: IUser) {
        try {
            const { _id, userImage, ...orther } = data;
            const res = await httpRequest.patch(`${urlname}/${_id}`, orther);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async changePassword(id: number | string, data: {
        passwordOld: string,
        passwordNew: string,
    }) {
        try {
            const res = await httpRequest.patch(`${urlname}/${id}`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async register(data: {
        usename: string;
        password: string;
        userEmail: string;
    }) {
        try {
            const res = await httpRequest.put(`${urlname}/register`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    //res password
    async restPassword(data: IRestPassword) {
        try {
            const res = await httpRequest.post(`${urlname}/reset`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiAuths;
