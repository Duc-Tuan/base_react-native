/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';
import { headersAxios } from 'utils/headersAxios';

const basePath: string = 'comments'

const ApiComments = {
    async getComments(page?: number, pageSize?: number, productId?: string | number) {
        try {
            const res = await httpRequest.get(`${basePath}`, {
                params: {
                    page,
                    pageSize,
                    productId
                },
            });
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async createComments(productId?: string, content?: string, token?: string) {
        try {
            await headersAxios(token);
            const res = await httpRequest.post(`${basePath}/${productId}`, { content: content });
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            console.log('message: ', message);
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiComments;
