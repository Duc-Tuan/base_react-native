/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';

const basePath: string = 'categories';

const ApiCategories = {
    async getCategories(page?: number, pageSize?: number, query?: string) {
        try {
            const res = await httpRequest.get(`${basePath}`, {
                params: {
                    page,
                    pageSize,
                    query
                },
            });
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiCategories;
