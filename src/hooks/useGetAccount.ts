/* eslint-disable prettier/prettier */
import { useAppSelector } from 'hooks';
import { IUser } from 'types/auth-types';

export const useGetAccount = () => {
    const user = useAppSelector((state: any) => state?.auth?.user);
    const isLogin = useAppSelector((state: any) => state?.auth?.isLogin);

    // const fetch = () => {
    // };
    // useEffect(() => {
    //     fetch();
    // }, []);

    const results: {
        user: IUser;
        isLogin: boolean;
    } = {
        user,
        isLogin,
    };
    return results;
};
