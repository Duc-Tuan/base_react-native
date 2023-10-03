import { StyleSheet, Text, View, ScrollView, TextStyle, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import useGetPayment from 'hooks/useGetPayment';
import {
  ActivityPenal,
  ButtonCustom,
  FlatListComponent,
  HeaderNew,
  ImageCustom,
  LoadingOverley,
  WrapperModal,
} from 'components';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import LinearGradient from 'react-native-linear-gradient';
import { formatCurrency, hexToRgba } from 'utils';
import { IconCart, IconLocation, IconPackOrder, IconPackOrderEmty, IconRightV2 } from 'assets/icons';
import { useTranslation } from 'react-i18next';
import useGetAddress from 'hooks/useGetAddress';
import { IPayments } from 'types/cart-types';
import { menuSub, renderAddress } from './const';
import { useBoolean } from 'hooks/useBoolean';
import Selectorlocation from './selectorLocation';
import { IOrder } from 'types/order-type';
import ApiOrder from 'assets/api/ApiOrder';
import { useToast } from 'hooks/useToast';
import { useAppDispatch } from 'hooks';
import { actions as actionsPayment } from 'modules/payment/store';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';

const ScreenPayments = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isPopup, { on, off, toggle }] = useBoolean();
  const { payments } = useGetPayment();
  const dispatch = useAppDispatch();
  const { address } = useGetAddress();
  const [totalmeney, setTotalMonney] = React.useState<number>(0);
  const [loadingLocation, setLoadingLocation] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [shipping, setShipping] = React.useState<number>(18000);
  const hiddenPopup = React.useCallback(() => {
    off();
  }, []);

  React.useEffect(() => {
    const result: number = payments.reduce((tol: number, curr: IPayments) => {
      return (tol += Number(curr?.price) * Number(curr?.qty));
    }, 0);
    setTotalMonney(result);
  }, [payments]);

  const styleText: TextStyle = {
    color: Colors.primary,
  };

  const handleIsPopUp = React.useCallback(() => {
    toggle();
  }, []);

  const handleOrder = React.useCallback(async () => {
    try {
      if (!address?._id === undefined) {
        return toast('error', 'Vui lòng chọn địa chỉ nhận hàng trước khi đặt hàng.');
      }

      const data: IOrder = {
        orderTotal: totalmeney,
        orderFeeShipping: shipping,
        orderContent: payments,
        orderReceiverId: address?._id,
      };
      setLoading(true);
      const res = await ApiOrder.createOrder(data);
      toast(res?.status ? 'success' : 'error', res?.mess);
      if (res?.status) {
        dispatch(actionsPayment.addPayments([]));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [payments, totalmeney, shipping, address]);

  const handleOpenCart = React.useCallback(() => {
    return NavigationService.navigate(PathName.CARTSCREEN);
  }, []);

  const handleCondition = React.useCallback(() => {
    return NavigationService.navigate(PathName.CONDITIONSCREEN);
  }, []);

  return (
    <>
      <ActivityPenal renderHeader={<HeaderNew title="Thanh toán" hiddenSearch />}>
        <View style={[styles.container, styleGlobal.flex_1]}>
          {loading ? (
            <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column, styleGlobal.flex_1]}>
              <IconPackOrder width={100} height={100} />
              <Text style={[styleGlobal.paddingTop_10, styleGlobal.textFontSize_16]}>
                {t('Vui lòng chờ trong giây lát...')}
              </Text>
            </View>
          ) : payments?.length > 0 ? (
            <ScrollView>
              <View style={[styleGlobal.padding_10]}>
                <View
                  style={[
                    styleGlobal.border,
                    styleGlobal.boxshadow,
                    styles.ViewAddress,
                    { overflow: 'hidden', borderRadius: 4 },
                  ]}>
                  {Platform.OS === 'android' && (
                    <LinearGradient
                      colors={[
                        hexToRgba(Colors.primary, 0.6),
                        'transparent',
                        hexToRgba(Colors.primary, 0.6),
                        'transparent',
                        hexToRgba(Colors.primary, 0.6),
                        'transparent',
                        hexToRgba(Colors.primary, 0.6),
                        'transparent',
                        hexToRgba(Colors.primary, 0.6),
                        'transparent',
                        hexToRgba(Colors.primary, 0.6),
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.viewLinearGradient}
                    />
                  )}

                  <View style={[styleGlobal.padding_6, styles.ViewDetailAddress]}>
                    <View style={[styleGlobal.dflex_spaceBetween]}>
                      <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart]}>
                        <IconLocation fill={Colors.primary} width={18} height={18} />
                        <Text style={[styleGlobal.textFontBold, styleGlobal.paddingHorizontal_4]}>
                          {t('Địa chỉ của tôi')}
                        </Text>
                      </View>

                      <ButtonCustom
                        text="Chọn địa chỉ khác"
                        styleButton={styles.ViewButtonAddress}
                        action={handleIsPopUp}
                      />
                    </View>

                    <View style={[styleGlobal.marginTop_4]}>
                      {renderAddress(address)?.map((i: menuSub, idx: number) => (
                        <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart]} key={idx}>
                          <Text>{t(i?.title)} </Text>
                          <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart]}>
                            <Text style={[styleGlobal.textFontBold_400]}>{i?.content}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    styleGlobal.border,
                    styleGlobal.boxshadow,
                    styleGlobal.marginTop_10,
                    styleGlobal.padding_6,
                    styles.ViewAddress,
                    styles.ViewDetailAddress,
                    { borderRadius: 4 },
                  ]}>
                  <View
                    style={[
                      styleGlobal.dflex_spaceBetween,
                      styleGlobal.paddingBottom_8,
                      styleGlobal.borderBottomPrimary,
                      { borderBottomColor: hexToRgba(Colors.black, 0.1) },
                    ]}>
                    <Text style={[styleGlobal.flex_3, styleGlobal.textFontBold_400]}>Sản phẩm</Text>
                    <Text style={[styleGlobal.flex_1, styleGlobal.textFontBold_400]}>Số lượng</Text>
                    <Text style={[styleGlobal.flex_2, styleGlobal.textFontBold_400, { textAlign: 'right' }]}>
                      Giá (vnđ)
                    </Text>
                  </View>

                  <View style={[styleGlobal.paddingTop_8]}>
                    {payments?.map((i: IPayments, idx: number) => {
                      const priceAfterPrommotion: number =
                        Number(i?.price) - Number(i?.price) * (Number(i?.promotion) / 100);
                      return (
                        <View
                          style={[
                            styleGlobal.dflex_spaceBetween,
                            idx === payments?.length - 1 ? undefined : styleGlobal.paddingBottom_8,
                          ]}
                          key={idx}>
                          <View style={[styleGlobal.flex_3, { overflow: 'hidden' }]}>
                            <View
                              style={[
                                styleGlobal.dFlex_center,
                                styleGlobal.alignItems_flexStart,
                                styleGlobal.justifyContent_flexStart,
                                styleGlobal.gap_10,
                              ]}>
                              <ImageCustom urlImeg={i?.image} styleWapper={styles.viewImage} />
                              <View style={{ flex: 1 }}>
                                <Text style={[styleGlobal.textFontBold_400]} numberOfLines={2}>
                                  {i?.name}
                                </Text>
                                <Text
                                  style={[
                                    {
                                      ...styleText,
                                      fontSize: i?.promotion ? 12 : 13,
                                      textDecorationLine: i?.promotion ? 'line-through' : 'none',
                                    },
                                  ]}>
                                  {formatCurrency(i?.price, ' vnđ')}
                                </Text>
                                {i?.promotion && (
                                  <Text style={{ ...styleText }}>
                                    {formatCurrency(priceAfterPrommotion ?? 0, ' vnđ')}
                                  </Text>
                                )}
                              </View>
                            </View>
                          </View>
                          <View style={[styleGlobal.flex_1]}>
                            <Text style={[styleGlobal.textFontBold, { ...styleText, textAlign: 'center' }]}>
                              {i?.qty}
                            </Text>
                          </View>
                          <View style={[styleGlobal.flex_2, { overflow: 'hidden' }]}>
                            <Text
                              style={[
                                styleGlobal.textFontBold_400,
                                {
                                  textAlign: 'right',
                                  ...styleText,
                                  fontWeight: i?.promotion ? '400' : '700',
                                  textDecorationLine: i?.promotion ? 'line-through' : 'none',
                                  fontSize: i?.promotion ? 12 : 14,
                                },
                              ]}
                              numberOfLines={1}>
                              {formatCurrency(i?.price * i?.qty, ' vnđ')}
                            </Text>
                            {i?.promotion && (
                              <Text style={{ ...styleText, textAlign: 'right', fontWeight: '700' }}>
                                {formatCurrency(priceAfterPrommotion * i?.qty ?? 0, ' vnđ')}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <View
                  style={[
                    styleGlobal.border,
                    styleGlobal.boxshadow,
                    styleGlobal.padding_6,
                    styleGlobal.marginTop_10,
                    styles.ViewAddress,
                    styles.ViewDetailAddress,
                    { borderRadius: 4 },
                  ]}>
                  <View
                    style={[
                      styleGlobal.dflex_spaceBetween,
                      styleGlobal.borderBottomPrimary,
                      styleGlobal.paddingBottom_8,
                      { borderBottomColor: hexToRgba(Colors.black, 0.1) },
                    ]}>
                    <Text style={[styleGlobal.textFontBold_400, { fontSize: 13 }]}>{t('Phương thức thanh toán')}</Text>
                    <Text style={[styleGlobal.textFontBold_400, styleText, { fontSize: 13 }]}>
                      {t('Thanh toán khi nhận hàng')}
                    </Text>
                  </View>

                  <View style={[styleGlobal.paddingTop_8]}>
                    {ItemInfoOrder(t('Tổng tiền hàng:'), totalmeney)}
                    {ItemInfoOrder(t('Tiền vận chuyển:'), shipping)}
                    {ItemInfoOrder(t('Tổng tiền thanh toán:'), totalmeney + shipping)}
                  </View>
                </View>

                <View
                  style={[
                    styleGlobal.border,
                    styleGlobal.boxshadow,
                    styleGlobal.padding_6,
                    styleGlobal.marginTop_10,
                    styles.ViewAddress,
                    styles.ViewDetailAddress,
                    { borderRadius: 4 },
                  ]}>
                  <Text>
                    {t(
                      `Khi bạn bấm vào 'Đặt hàng' đồng nghĩa với việc bạn đã đồng ý với 'Điều khoản mua hàng' của chúng tôi.`,
                    )}
                  </Text>

                  <TouchableOpacity style={[styleGlobal.padding_6]} activeOpacity={0.8} onPress={handleCondition}>
                    <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.justifyContent_flexStart, { gap: 4 }]}>
                      <IconRightV2 fill={Colors.primary} width={18} height={18} />
                      <Text style={styleText}>Xem điều khoản</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column, styleGlobal.flex_1]}>
              <IconPackOrderEmty fill={Colors.primary} width={100} height={100} />
              <Text
                style={[
                  styleGlobal.marginBottom_10,
                  styleGlobal.marginTop_10,
                  styleGlobal.textFontSize_16,
                  { padding: 20, textAlign: 'center' },
                ]}>
                {t(
                  'Hiện không có sản phẩm nào để tạo đơn hàng. Vui lòng chọn sản phẩm trong giỏ hàng để có thể tiếp tục đặt hàng.',
                )}
              </Text>

              <TouchableOpacity activeOpacity={0.8} onPress={handleOpenCart}>
                <View
                  style={[
                    styleGlobal.dFlex_center,
                    styleGlobal.flexDirection_column,
                    styleGlobal.gap_4,
                    styles.ViewCart,
                    {
                      borderColor: hexToRgba(Colors.primary, 0.6),
                    },
                  ]}>
                  <IconCart fill={Colors.primary} width={40} height={40} />
                  <Text style={[styleText, styleGlobal.textFontSize_16]}>{t('Vào giỏ hàng')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={[styleGlobal.padding_10, styleGlobal.dflex_spaceBetween, styleGlobal.gap_18]}>
            <View style={styleGlobal.flex_3}>
              <View style={styleGlobal.dflex_spaceBetween}>
                <Text style={[styleGlobal.textFontBold]}>{t('Thành tiền:')}</Text>
                <Text style={[styleGlobal.textFontBold, styleText]} numberOfLines={1}>
                  {payments?.length > 0 ? formatCurrency(totalmeney + shipping, ' vnđ') : '0 vnđ'}
                </Text>
              </View>
            </View>
            <ButtonCustom
              text="Đặt hàng"
              styleButton={styleGlobal.flex_1}
              action={() => {
                (loading || payments?.length > 0) && handleOrder();
              }}
              disabled={loading || !(payments?.length > 0)}
              typeButton={loading || !(payments?.length > 0) ? 'disabled' : 'main'}
            />
          </View>
        </View>
      </ActivityPenal>

      {isPopup && (
        <WrapperModal
          hiddenPopup={hiddenPopup}
          isVisible={isPopup}
          textHeader="Chọn địa chỉ mới"
          styleWrapper={styles.ViewPopUp}
          isClose={false}
          subHeader
          styleTextHeader={[styleGlobal.textFontBold, styleGlobal.textFontSize_16]}
          styleChidren={styles.ViewChidren}>
          {loading ? (
            <LoadingOverley visible={loadingLocation} />
          ) : (
            <Selectorlocation isCallApi={isPopup} hiddenPopup={hiddenPopup} location={address} />
          )}
        </WrapperModal>
      )}
    </>
  );
};

export default React.memo(ScreenPayments);

const ItemInfoOrder = (title: string, content: number) => {
  return (
    <View
      style={[
        styleGlobal.dflex_spaceBetween,
        styleGlobal.justifyContent_flexEnd,
        styleGlobal.paddingVertical_4,
        styleGlobal.gap_10,
      ]}>
      <Text style={{ flex: 1 }}>{title}</Text>
      <Text style={[styleGlobal.textFontBold, { color: Colors.primary, textAlign: 'right' }]} numberOfLines={1}>
        {formatCurrency(content, ' vnđ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
  viewLinearGradient: { width: '100%', height: 2 },
  ViewAddress: {
    borderColor: hexToRgba(Colors.black, 0.2),
  },
  ViewDetailAddress: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  ViewButtonAddress: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  viewImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  ViewPopUp: {
    width: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  ViewChidren: {
    height: '86%',
    padding: 4,
    paddingTop: 10,
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  ViewCart: {
    paddingHorizontal: 40,
    paddingVertical: 6,
    borderStyle: 'dashed',
    borderRadius: 14,
    borderWidth: 1.6,
  },
});
