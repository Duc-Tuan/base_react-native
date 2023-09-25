/* eslint-disable prettier/prettier */
import { useAppSelector } from 'hooks';

const useGetHeart = () => {
    const hearts = useAppSelector((state: any) => state?.heart?.hearts);

    const results: {
        dataHearts: string[]
    } = {
        dataHearts: hearts,
    };
    return results;
};

export default useGetHeart;