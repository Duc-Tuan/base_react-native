/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';

const basePath: string = 'products';

const ApiProducts = {
    async getProducts(page?: number, pageSize?: number, category?: string) {
        try {
            const res = await httpRequest.get(`${basePath}`, {
                params: {
                    page,
                    category,
                    pageSize,
                },
            });
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async getProductsLike(ids?: string[], page?: number, pageSize?: number) {
        try {
            const res = await httpRequest.post(`${basePath}/user-like`, {
                body: {
                    ids
                },
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
};

export default ApiProducts;
