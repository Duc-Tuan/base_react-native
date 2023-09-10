/* eslint-disable prettier/prettier */
import * as httpRequest from 'store/axios';

const urlname: string = 'uploadFile';

const ApiUploadImage = {
    async upload(data: { imageBase64: string, fileName?: string }) {
        try {
            data.fileName = 'images/users';
            const res = await httpRequest.post(`${urlname}/image`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async delete(data: any) {
        try {
            const res = await httpRequest.delet(`${urlname}`, data);
            console.log(res);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return { status: status, mess: message ?? 'Đã có lỗi xảy ra!' };
            // return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiUploadImage;
