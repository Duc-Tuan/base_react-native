import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator, TextStyle } from 'react-native';
import { IOptions } from 'types/product-types';
import { IOrderReceiver } from './const';
import { checkNullish } from 'utils/genal';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

export const startPay = (data: string) => {};

export const startOrder: (data: string) => React.JSX.Element = (data: string) => {
  switch (data) {
    case 'WAIT_FOR_CONFIRMATION':
      return (
        <Text
          style={[
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingVertical_4,
            styleGlobal.textFontBold,
            { color: Colors.white, backgroundColor: hexToRgba('#f6a609', 0.8), borderRadius: 6 },
          ]}>
          Chờ xác nhận
        </Text>
      );
    case 'CONFIRMED':
      return (
        <Text
          style={[
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingVertical_4,
            styleGlobal.textFontBold,
            { color: Colors.white, borderRadius: 6 },
          ]}>
          Xác nhận
        </Text>
      );
    case 'DELIVERED_ONLY':
      return (
        <Text
          style={[
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingVertical_4,
            styleGlobal.textFontBold,
            { color: Colors.white, backgroundColor: hexToRgba('#f6a609', 0.8), borderRadius: 6 },
          ]}>
          Chờ xác nhận
        </Text>
      );
    case 'DELIVERED':
      return (
        <Text
          style={[
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingVertical_4,
            styleGlobal.textFontBold,
            { color: Colors.white, borderRadius: 6 },
          ]}>
          Đã giao hàng
        </Text>
      );
    case 'COMPLETED':
      return (
        <Text
          style={[
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingVertical_4,
            styleGlobal.textFontBold,
            { color: Colors.white, borderRadius: 6, backgroundColor: hexToRgba('#00c39f', 0.8) },
          ]}>
          Hoàn thành
        </Text>
      );
    case 'CANCELED':
      return (
        <Text
          style={[
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingVertical_4,
            styleGlobal.textFontBold,
            { color: Colors.white, borderRadius: 6 },
          ]}>
          Đã hủy
        </Text>
      );
    default:
      return (
        <Text
          style={[
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingVertical_4,
            styleGlobal.textFontBold,
            { color: Colors.white, borderRadius: 6 },
          ]}>
          Chờ xác nhận
        </Text>
      );
  }
};

export const renderAddress: (data: IOrderReceiver) => IOptions[] = (data: IOrderReceiver) => {
  return [
    {
      value: 'Tên người nhận:',
      label: checkNullish(data?.addressNameReceiver) ?? '---',
    },
    {
      value: 'Số điện thoại:',
      label: checkNullish(data?.addressPhoneReceive) ?? '---',
    },
    {
      value: 'Địa chỉ chi tiết:',
      label: checkNullish(data?.addressDetail) ?? '---',
    },
  ];
};
