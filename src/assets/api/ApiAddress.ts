/* eslint-disable prettier/prettier */
import { ILocation } from 'assets/data';
import * as httpRequest from 'store/axios';

const ApiAddressOrder = {
    async getAddressOrder(page?: number, pageSize?: number) {
        try {
            const res = await httpRequest.get('addressOrders', {
                params: {
                    page,
                    pageSize,
                },
            });
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async createAddressOrder(data: ILocation) {
        try {
            const res = await httpRequest.put('addressOrders', data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiAddressOrder;
