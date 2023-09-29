/* eslint-disable prettier/prettier */
import { RouteProp } from '@react-navigation/native';
import { ILocation } from 'assets/data';

export type RootStackParamList = {
    [key: string]: any;
    OrderDetailScreen: { id: string | number; onRefresh?: () => void; isSupplier?: boolean; isAutoFu?: boolean };
    DetailAddressScreen: { data: ILocation };
    NewAndEditAddress: { data?: any, _id?: string | number };
    MerchentScreen: { idCategory?: string | number, nameCategory?: string };
    ScreenDetailProduct: { id?: string | number };
};

export type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetailScreen'>;
export type DetailAddressScreenRouteProp = RouteProp<RootStackParamList, 'DetailAddressScreen'>;
export type NewAddressScreenRouteProp = RouteProp<RootStackParamList, 'NewAndEditAddress'>;
export type MerchentScreenRouteProp = RouteProp<RootStackParamList, 'MerchentScreen'>;
export type DetailProductScreenRouteProp = RouteProp<RootStackParamList, 'ScreenDetailProduct'>;
