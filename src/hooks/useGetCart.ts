/* eslint-disable prettier/prettier */
import { useAppSelector } from 'hooks';
import { ItemCart } from 'modules/auth/screen/Function';

export const useGetCart = () => {
    const carts = useAppSelector((state: any) => state?.carts?.carts);
    const penddingBuy = useAppSelector((state: any) => state?.carts?.penddingBuy);

    // const fetch = () => {
    // };
    // useEffect(() => {
    //     fetch();
    // }, []);

    const results: {
        carts: ItemCart[];
        penddingBuy: ItemCart[];
        cartLength: number;
    } = {
        cartLength: carts.length,
        penddingBuy,
        carts,
    };
    return results;
};
