/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';
import { headersAxios } from 'utils/headersAxios';
import { IOrder } from 'types/order-type';

const basePath: string = 'orders';

const ApiOrder = {
    async getOrder(token?: string, page?: number, pageSize?: number, orderSatus?: string, query?: string) {
        try {
            await headersAxios(token);
            const res = await httpRequest.get(`${basePath}`,
                {
                    params: {
                        page,
                        pageSize,
                        orderSatus: orderSatus,
                        query,
                    },
                });
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async createOrder(data: IOrder) {
        try {
            await headersAxios();
            const res = await httpRequest.put(`${basePath}`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async getDetailOrder(id?: string | number) {
        try {
            await headersAxios();
            const res = await httpRequest.get(`${basePath}/${id}`);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiOrder;
