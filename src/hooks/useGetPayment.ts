/* eslint-disable prettier/prettier */
import { useAppSelector } from 'hooks';
import { IPayments } from 'types/cart-types';

const useGetPayment = () => {
    const data = useAppSelector((state: any) => state?.payment?.penddingBuy);

    const results: {
        payments: IPayments[];
    } = {
        payments: data,
    };
    return results;
};

export default useGetPayment;