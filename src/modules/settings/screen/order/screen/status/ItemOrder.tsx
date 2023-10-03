import { ImageCustom } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextStyle, View, TouchableOpacity } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { formatCurrency, hexToRgba } from 'utils';
import { IOrderContent, IOrders } from './const';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import ItemProducts from '../components/ItemProducts';

interface IProps {
  data: IOrders;
}

const ItemOrder: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();

  const styleText: TextStyle = {
    color: Colors.primary,
  };

  const urlImagePay = React.useMemo(
    () =>
      data?.orderPaymentMethods?.status ? require('assets/images/paid.png') : require('assets/images/not_pay.png'),
    [data?.orderPaymentMethods?.status],
  );

  const handleDirectional = () => {
    return NavigationService.navigate(PathName.DETAILORDERSCREEN, { id: data?._id });
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleDirectional}>
      <View style={styles.container}>
        <View style={[styles.ViewImagePay, styleGlobal.dFlex_center]}>
          <ImageCustom url={urlImagePay} styleWapper={{ width: 200, height: 200, objectFit: 'contain' }} />
        </View>
        <View
          style={[
            styleGlobal.border,
            styleGlobal.padding_6,
            {
              borderRadius: 6,
              borderColor: hexToRgba(Colors.black, 0.2),
            },
          ]}>
          <View
            style={[
              styleGlobal.dflex_spaceBetween,
              styleGlobal.paddingBottom_8,
              styleGlobal.borderBottomPrimary,
              {
                borderBottomColor: hexToRgba(Colors.black, 0.1),
              },
            ]}>
            <Text style={[styleGlobal.textPrimary]}>
              {t('Mã ĐH:')} <Text style={[styleGlobal.textFontBold, styleGlobal.textPrimary]}>{data?.code}</Text>
            </Text>

            <Text
              style={{
                backgroundColor: data?.orderPaymentMethods?.status ? '#00c39f' : '#C2185B',
                color: Colors.white,
                fontWeight: '700',
                paddingHorizontal: 10,
                borderRadius: 4,
              }}>
              {data?.orderPaymentMethods?.status ? t('Đã thanh toán') : t('Chưa thanh toán')}
            </Text>
          </View>

          <ItemProducts data={data?.orderContent} />

          <View
            style={[
              styleGlobal.paddingVertical_8,
              styleGlobal.dflex_spaceBetween,
              styleGlobal.gap_10,
              styleGlobal.borderBottomPrimary,
              { borderBottomColor: hexToRgba(Colors.black, 0.1) },
            ]}>
            <Text style={[styleGlobal.textPrimary]}>{t('Phương thức thanh toán')}</Text>
            <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold_400, styleText]}>
              {data?.orderPaymentMethods?.method === 'PAYMENT_DELIVERED' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
            </Text>
          </View>

          <View style={[styleGlobal.paddingVertical_8]}>
            <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold, styleGlobal.paddingBottom_8]}>
              {t('Tổng tiền phải thanh toán')}
            </Text>
            <View>
              <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingVertical_2]}>
                <Text style={[styleGlobal.textPrimary]}>{t('Tổng tiền hàng:')}</Text>
                <Text style={[styleGlobal.textFontBold, styleText]}>{formatCurrency(data?.orderTotal, ' vnđ')}</Text>
              </View>
              <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingVertical_2]}>
                <Text style={[styleGlobal.textPrimary]}>{t('Tiền vận chuyển:')}</Text>
                <Text style={[styleGlobal.textFontBold, styleText]}>
                  {formatCurrency(data?.orderFeeShipping, ' vnđ')}
                </Text>
              </View>
              <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingVertical_2]}>
                <Text style={[styleGlobal.textPrimary]}>{t('Thành tiền:')}</Text>
                <Text style={[styleGlobal.textFontBold, styleText]}>
                  {formatCurrency(data?.orderTotal + data?.orderFeeShipping, ' vnđ')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemOrder;

const styles = StyleSheet.create({
  container: { position: 'relative' },
  ViewImagePay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  ViewAddress: {},
  ViewDetailAddress: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  viewImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
});
