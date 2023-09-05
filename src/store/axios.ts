import * as httpRequest from '../utils/httpsRequest';

export const ApiProducts = {
  async getProducts(page?: number, pageSize?: number, category?: string) {
    try {
      const res = await httpRequest.get('products', {
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
};
