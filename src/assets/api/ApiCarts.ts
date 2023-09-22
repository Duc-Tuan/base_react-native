/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';
import { headersAxios } from 'utils/headersAxios';

const basePath: string = 'carts'

const ApiCarts = {
    async getCarts() {
        try {
            await headersAxios();
            const res = await httpRequest.get(`${basePath}`);
            console.log(res);

            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiCarts;
