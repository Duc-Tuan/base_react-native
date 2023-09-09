/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';

const ApiAuths = {
    async login() {
        try {
            const res = await httpRequest.post('auths/login');
            console.log(res);
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
            const res = await httpRequest.put('auths/register', data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiAuths;
