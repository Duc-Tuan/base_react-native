import AsyncStorage from "@react-native-async-storage/async-storage";
import * as axiosInstance from 'store/axios';

export const headersAxios = async (data?: string) => {
    const token: any = await AsyncStorage.getItem('token');
    return axiosInstance.setHeaders({ 'x-food-access-token': data ?? token });
}