/* eslint-disable prettier/prettier */
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    [key: string]: any;
    OrderDetailScreen: { id: string | number; onRefresh?: () => void; isSupplier?: boolean; isAutoFu?: boolean };
};

export type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetailScreen'>;
