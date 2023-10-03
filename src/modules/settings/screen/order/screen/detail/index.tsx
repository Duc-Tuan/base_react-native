import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TextStyle,
  Platform,
} from 'react-native';
import React from 'react';
import { DetailOrderScreenRouteProp } from 'naviagtion/stack/NavigationRoute';
import { ActivityPenal, ImageCustom } from 'components';
import Colors from 'themes/Color';
import { styleGlobal, widthFull } from 'types/StyleGlobal';
import ApiOrder from 'assets/api/ApiOrder';
import useFetchData from 'hooks/useFetchData';
import ItemProducts from '../components/ItemProducts';
import { formatCurrency, hexToRgba } from 'utils';
import { useTranslation } from 'react-i18next';
import { startOrder } from '../status/Sub';
import { renderAddress, renderHistory } from './SubDetail';
import { IOptions } from 'types/product-types';

interface IProps {
  route: DetailOrderScreenRouteProp;
}

const dataStatus: IOptions[] = [
  {
    value: 'ORDER',
    label: 'Đặt hàng',
  },
  {
    value: 'PREPARE',
    label: 'Đang đóng gói',
  },
  {
    value: 'BEING_SHIPPED',
    label: 'Đang vận chuyển',
  },
  {
    value: 'DELIVERED',
    label: 'Đã giao hàng',
  },
];

const DetailOrderScreen: React.FC<IProps> = ({ route: { params } }) => {
  const { id } = params;
  const { t } = useTranslation();

  const func1 = React.useCallback(() => ApiOrder.getDetailOrder(id).then(res => res), [id]);
  const { data: dataList, onRefresh, loading, refreshing } = useFetchData(func1);

  const styleText: TextStyle = {
    color: Colors.primary,
  };

  const urlImagePay = React.useMemo(
    () =>
      dataList?.orderPaymentMethods?.status ? require('assets/images/paid.png') : require('assets/images/not_pay.png'),
    [dataList?.orderPaymentMethods?.status],
  );

  const borderB = [styleGlobal.borderBottomPrimary, { borderBottomColor: hexToRgba(Colors.black, 0.1) }];

  return (
    <ActivityPenal title="Chi tiết đơn hàng">
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
        {loading ? (
          <View style={[styles.listFooterComponent]}>{<ActivityIndicator color={Colors.primary} />}</View>
        ) : (
          <View style={[styleGlobal.padding_10]}>
            {/* mã */}
            <View style={[styleGlobal.dflex_spaceBetween]}>
              <Text style={[styleGlobal.textPrimary]}>
                {t('Mã ĐH:')} <Text style={[styleGlobal.textFontBold, styleGlobal.textPrimary]}>{dataList?.code}</Text>
              </Text>

              <Text
                style={{
                  backgroundColor: dataList?.orderPaymentMethods?.status ? '#00c39f' : '#C2185B',
                  color: Colors.white,
                  fontWeight: '700',
                  paddingHorizontal: 10,
                  borderRadius: 4,
                }}>
                {dataList?.orderPaymentMethods?.status ? t('Đã thanh toán') : t('Chưa thanh toán')}
              </Text>
            </View>

            {/* Trạng thái đơn hàng */}
            <View style={[styleGlobal.paddingVertical_8, ...borderB]}>
              <View style={[styleGlobal.dflex_spaceBetween]}>
                <Text style={[styleGlobal.textPrimary]}>{t('Trạng thái đơn hàng')}</Text>
                {startOrder(dataList?.orderSatus)}
              </View>
            </View>

            {/* Điạ chỉ nhận đơn hàng */}
            <View style={[styleGlobal.paddingVertical_8, ...borderB]}>
              <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold]}>{t('Địa chỉ nhận hàng')}</Text>
              <View>
                {renderAddress(dataList?.orderReceiver)?.map((i: IOptions, idx: number) => (
                  <View
                    key={idx}
                    style={[
                      styleGlobal.paddingVertical_2,
                      styleGlobal.dFlex_center,
                      styleGlobal.justifyContent_flexStart,
                      styleGlobal.gap_4,
                    ]}>
                    <Text style={[styleGlobal.textFontBold_400]}>{t(String(i?.value))}</Text>
                    <Text style={[styleGlobal.textFontBold_400]}>{i?.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Danh sách sản phảm */}
            <ItemProducts data={dataList?.orderContent} />

            {/* Phương thức thanh toán */}
            <View
              style={[styleGlobal.paddingVertical_8, styleGlobal.dflex_spaceBetween, styleGlobal.gap_10, ...borderB]}>
              <Text style={[styleGlobal.textPrimary]}>{t('Phương thức thanh toán')}</Text>
              <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold_400, styleText]}>
                {dataList?.orderPaymentMethods?.method === 'PAYMENT_DELIVERED'
                  ? 'Thanh toán khi nhận hàng'
                  : 'Chuyển khoản'}
              </Text>
            </View>

            {/* Thanh toán */}
            <View style={[styleGlobal.paddingVertical_8, ...borderB]}>
              <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold, styleGlobal.paddingBottom_8]}>
                {t('Tổng tiền phải thanh toán')}
              </Text>
              <View>
                <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingVertical_2]}>
                  <Text style={[styleGlobal.textPrimary]}>{t('Tổng tiền hàng:')}</Text>
                  <Text style={[styleGlobal.textFontBold, styleText]}>
                    {formatCurrency(dataList?.orderTotal, ' vnđ')}
                  </Text>
                </View>
                <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingVertical_2]}>
                  <Text style={[styleGlobal.textPrimary]}>{t('Tiền vận chuyển:')}</Text>
                  <Text style={[styleGlobal.textFontBold, styleText]}>
                    {formatCurrency(dataList?.orderFeeShipping, ' vnđ')}
                  </Text>
                </View>
                <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingVertical_2]}>
                  <Text style={[styleGlobal.textPrimary]}>{t('Thành tiền:')}</Text>
                  <Text style={[styleGlobal.textFontBold, styleText]}>
                    {formatCurrency(dataList?.orderTotal + dataList?.orderFeeShipping, ' vnđ')}
                  </Text>
                </View>
              </View>
            </View>

            {/* Chú ý */}
            <View style={[styleGlobal.paddingVertical_8, ...borderB]}>
              <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold]}>{t('Chú ý')}</Text>
              <Text style={[styleGlobal.padding_4]}>{dataList?.orderNotif}</Text>
            </View>

            {/* Lịch sử đơn hàng */}
            <View style={[styleGlobal.paddingVertical_8]}>
              <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold]}>{t('Lịch sử giao hàng')}</Text>
              <View style={[styleGlobal.marginTop_10]}>
                <View
                  style={[
                    styleGlobal.dFlex_center,
                    styleGlobal.flexDirection_column,
                    styleGlobal.alignItems_flexStart,
                    styleGlobal.gap_10,
                    {
                      flexDirection: 'column-reverse',
                    },
                  ]}>
                  {dataStatus?.map((i: IOptions, idx: number) => {
                    const isCheck = dataList?.orderHistory?.some((d: any) => d?.status === i?.value);
                    return (
                      <View
                        key={idx}
                        style={[
                          styleGlobal.dFlex_center,
                          styleGlobal.flexDirection_column,
                          styleGlobal.alignItems_flexStart,
                        ]}>
                        <View
                          style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart, styleGlobal.gap_10]}>
                          <View
                            style={[
                              styles.ViewCir,
                              { backgroundColor: isCheck ? Colors.primary : hexToRgba(Colors.primary, 0.2) },
                            ]}
                          />

                          <View style={[styleGlobal.dflex_spaceBetween, { width: widthFull - 44 }]}>
                            <Text
                              style={[
                                styleGlobal.textPrimary,
                                isCheck && styleGlobal.textFontBold,
                                { color: isCheck ? Colors.primary : hexToRgba(Colors.black, 0.2) },
                              ]}>
                              {t(
                                String(
                                  dataList?.orderHistory[idx]
                                    ? renderHistory(dataList?.orderHistory[idx])?.value
                                    : i?.label,
                                ),
                              )}
                            </Text>
                            <Text
                              style={[
                                styleGlobal.textPrimary,
                                isCheck && styleGlobal.textFontBold,
                                { color: isCheck ? Colors.primary : hexToRgba(Colors.black, 0.2) },
                              ]}>
                              {dataList?.orderHistory[idx]
                                ? renderHistory(dataList?.orderHistory[idx])?.label
                                : t('Đang cập nhật...')}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.ViewSeparation,
                            { backgroundColor: isCheck ? Colors.primary : hexToRgba(Colors.primary, 0.2) },
                          ]}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={[styles.ViewImagePay, styleGlobal.dFlex_center]}>
              {!loading && (
                <ImageCustom url={urlImagePay} styleWapper={{ width: 200, height: 200, objectFit: 'contain' }} />
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </ActivityPenal>
  );
};

export default DetailOrderScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white, marginTop: 8 },
  ViewImagePay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
  ViewCir: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  ViewSeparation: {
    width: 2,
    height: 40,
    marginLeft: 4,
  },
});
