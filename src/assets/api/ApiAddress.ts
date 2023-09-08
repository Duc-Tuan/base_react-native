/* eslint-disable prettier/prettier */
import { ILocation } from 'assets/data';
import * as httpRequest from 'store/axios';

const namePath: string = 'addressOrders';

const ApiAddressOrder = {
    async getAddressOrder(page?: number, pageSize?: number) {
        try {
            const res = await httpRequest.get(`${namePath}`, {
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

    async getDetailAddressOrder(id?: string | number) {
        try {
            const res = await httpRequest.get(`${namePath}/${id}`);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async createAddressOrder(data: ILocation) {
        try {
            const res = await httpRequest.put(`${namePath}`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async editAddressOrder(id?: string | number, data?: ILocation) {
        try {
            const res = await httpRequest.patch(`${namePath}/${id}`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async deleteAddressOrder(id?: string | number) {
        try {
            const res = await httpRequest.delet(`${namePath}/${id}`);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiAddressOrder;
