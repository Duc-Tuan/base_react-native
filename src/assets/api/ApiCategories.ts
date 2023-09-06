/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';

const ApiCategories = {
    async getCategories() {
        try {
            const res = await httpRequest.get('categories');
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiCategories;
