/* eslint-disable prettier/prettier */
import { ILocation } from 'assets/data';
import { useAppSelector } from 'hooks';

const useGetAddress = () => {
    const data = useAppSelector((state: any) => state?.auth?.addressOrder);

    const results: {
        address: ILocation;
    } = {
        address: data,
    };
    return results;
};

export default useGetAddress;