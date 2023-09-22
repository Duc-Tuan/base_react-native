/* eslint-disable prettier/prettier */
import { useAppSelector } from 'hooks';
import { ICartsData } from 'types/cart-types';

const useGetCart = () => {
    const carts = useAppSelector((state: any) => state?.carts?.carts);
    const penddingBuy = useAppSelector((state: any) => state?.carts?.penddingBuy);

    const results: {
        carts: ICartsData[];
        penddingBuy: ICartsData[];
        cartLength: number;
    } = {
        cartLength: carts.length,
        penddingBuy,
        carts,
    };
    return results;
};

export default useGetCart;