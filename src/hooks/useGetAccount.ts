/* eslint-disable prettier/prettier */
import { useAppSelector } from 'hooks';
import { IUserGlobal } from 'modules/auth/screen/Function';

export const useGetAccount = () => {
    const user = useAppSelector((state: any) => state?.auth?.user);
    const isLogin = useAppSelector((state: any) => state?.auth?.isLogin);

    // const fetch = () => {
    // };
    // useEffect(() => {
    //     fetch();
    // }, []);

    const results: {
        user: IUserGlobal;
        isLogin: boolean;
    } = {
        user,
        isLogin,
    };
    return results;
};
