import { ApiProducts } from 'assets/api';
import { ActivityPenal, ButtonCustom, WrapperModal } from 'components';
import useFetchData from 'hooks/useFetchData';
import { DetailProductScreenRouteProp } from 'naviagtion/stack/NavigationRoute';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import ViewImageDetail from './components/ViewImageDetail';
import { BANNER_H, renderItem } from './const';
import { IOptions } from 'types/product-types';
import { startProduct } from './components/status';
import { IconAdd, IconAddCart, IconMess, IconPay, IconRemove } from 'assets/icons';
import { IPayments } from 'types/cart-types';
import { useAppDispatch } from 'hooks';
import { actions as actionsPayment } from 'modules/payment/store';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import { formatCurrency, hexToRgba } from 'utils';
import { useToast } from 'hooks/useToast';
import { actions as actionsCart } from 'modules/cart/store';
import { CartsContructor } from 'modules/components/product/contructor';
import DescAndComments from './descAndComments';
import Comments from './descAndComments/components/Comments';
import { useBoolean } from 'hooks/useBoolean';
import IconComment from 'assets/icons/icon_comment';

interface IProps {
  route: DetailProductScreenRouteProp;
}

const ScreenDetailProduct: React.FC<IProps> = ({ route: { params } }) => {
  const { id } = params;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const scrollA = React.useRef(new Animated.Value(0)).current;
  const [qty, setQty] = React.useState<number>(1);
  const [callApi, setCallApi] = React.useState<boolean>(false);
  const [isComments, { on, off, toggle }] = useBoolean();

  const func1 = React.useCallback(() => ApiProducts.getDetailProduct(id).then(res => res), [id]);
  const { data: dataList, onRefresh, loading, refreshing } = useFetchData(func1);

  const hiddenPopup = React.useCallback(() => {
    off();
  }, []);

  // console.log('dataList: ', dataList);

  const handlePay = () => {
    const dataNew: IPayments = {
      _id: dataList?._id,
      name: dataList?.productName,
      image: dataList?.productImage,
      promotion: dataList?.productPromotion,
      qty: qty,
      price: dataList?.productPrice,
    };
    dispatch(actionsPayment.addPayments([dataNew]));
    return NavigationService.navigate(PathName.PAYMENTSSCREEN);
  };

  const handleAddCart = React.useCallback(async () => {
    try {
      const result = new CartsContructor(
        dataList?._id,
        dataList?.code,
        dataList?.productImage,
        dataList?.productName,
        dataList?.productPrice,
        dataList?.productPromotion,
      ).data();
      const res = await dispatch(actionsCart.postCarts({ data: result }));
      const { payload }: any = res;
      toast(payload?.status ? 'success' : 'error', payload?.mess);
    } catch (error) {}
  }, [dataList]);

  return (
    <>
      <ActivityPenal title="Thông tin chi tiết sản phẩm">
        <View style={[styleGlobal.flex_1, styles.container]}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollA } } }], { useNativeDriver: false })}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
            }>
            <View style={[styleGlobal.padding_10]}>
              <Animated.View style={[styleSub.banner(scrollA)]}>
                <ViewImageDetail
                  data={[
                    dataList?.productImage,
                    dataList?.productImage,
                    dataList?.productImage,
                    dataList?.productImage,
                    // ...dataList?.productImageDetail,
                  ]}
                />
              </Animated.View>

              <View style={[styleGlobal.backgroundColorWhite, styleGlobal.paddingTop_10]}>
                <Text style={[styleGlobal.textFontBold_500, styleGlobal.textFontSize_18]} numberOfLines={2}>
                  {dataList?.productName}
                </Text>

                <View style={[styleGlobal.paddingTop_10]}>
                  <View
                    style={[
                      styleGlobal.dFlex_center,
                      styleGlobal.alignItems_flexStart,
                      styleGlobal.justifyContent_flexStart,
                      styleGlobal.paddingVertical_4,
                    ]}>
                    <Text style={[styles.ViewName, styleGlobal.textFontBold_400]}>{t('Số lượng mua:')}</Text>
                    <View style={[styleGlobal.flex_2, { width: '100%' }]}>
                      <View
                        style={[
                          styleGlobal.justifyContent_spaceBetween,
                          styleGlobal.alignItems_center,
                          styleGlobal.flexDirection_row,
                          styleGlobal.gap_6,
                          styles.changeQty,
                          {
                            width: 120,
                            backgroundColor: Colors.primary,
                            borderColor: hexToRgba(Colors.primary, 0.6),
                          },
                        ]}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={[styles.btn_changeQty]}
                          onPress={() => setQty((prev: number) => (prev === 1 ? 1 : prev - 1))}>
                          <IconRemove fill={Colors.primary} width={20} height={20} />
                        </TouchableOpacity>

                        <TextInput
                          value={String(qty)}
                          style={styles.viewTextInput}
                          keyboardType="numeric"
                          onChangeText={e => setQty(Number(e) === 1 || Number(e) === 0 ? 1 : Number(e))}
                        />

                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={[styles.btn_changeQty]}
                          onPress={() => setQty((prev: number) => prev + 1)}>
                          <IconAdd fill={Colors.primary} width={20} height={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styleGlobal.dFlex_center,
                      styleGlobal.justifyContent_flexStart,
                      styleGlobal.paddingVertical_4,
                    ]}>
                    <Text style={[styles.ViewName, styleGlobal.textFontBold_400]}>{t('Trạng thái: ')}</Text>
                    <View style={[styleGlobal.flex_2]}>{startProduct(dataList?.productStatus)}</View>
                  </View>

                  {renderItem(dataList)?.map((i: IOptions, idx: number) => (
                    <View
                      key={idx}
                      style={[
                        styleGlobal.dFlex_center,
                        styleGlobal.alignItems_flexStart,
                        styleGlobal.justifyContent_flexStart,
                        styleGlobal.paddingVertical_4,
                      ]}>
                      <Text style={[styles.ViewName, styleGlobal.textFontBold_400]}>{t(String(i.value))}</Text>
                      <View style={[styleGlobal.flex_2, { width: '100%' }]}>{i?.label}</View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Mô tả chi tiết & bình luận */}
              <DescAndComments id={id} data={dataList?.productDescribes} />
            </View>
          </Animated.ScrollView>

          <TouchableOpacity
            onPress={toggle}
            style={[styleGlobal.padding_8, styles.ViewComment, { backgroundColor: hexToRgba(Colors.primary, 0.2) }]}
            activeOpacity={0.8}>
            <IconComment fill={Colors.primary} />
          </TouchableOpacity>

          <View style={[styleGlobal.padding_10]}>
            <View style={[styleGlobal.paddingBottom_10]}>
              <Text style={[styleGlobal.textFontBold_400]}>
                {t('Thành tiền: ')}:{' '}
                <Text style={[styleGlobal.textFontBold, { color: Colors.primary, fontSize: 16 }]}>
                  {formatCurrency(
                    Math.abs(
                      Number(dataList?.productPrice) -
                        Number(dataList?.productPrice) * (Number(dataList?.productPromotion) / 100),
                    ) * qty,
                    ' vnđ',
                  )}
                </Text>
              </Text>
            </View>
            <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
              <ButtonCustom
                action={handleAddCart}
                styleButton={[styleGlobal.flex_1]}
                text="Thêm vào giỏi hàng"
                typeButton="outline-main"
                IconLeft={<IconAddCart width={18} height={18} fill={Colors.primary} />}
              />
              <ButtonCustom
                styleButton={[styleGlobal.flex_1]}
                text="Mua ngay"
                IconLeft={<IconPay width={18} height={18} fill={Colors.white} />}
                action={handlePay}
              />
            </View>
          </View>
        </View>
      </ActivityPenal>

      {isComments && (
        <WrapperModal
          hiddenPopup={hiddenPopup}
          isVisible={isComments}
          subHeader
          isClose={false}
          textHeader="Bình luận"
          styleWrapper={styles.ViewPopUp}
          styleTextHeader={[styleGlobal.textFontBold, styleGlobal.textFontSize_16]}
          styleChidren={styles.ViewChidren}>
          <Comments />
        </WrapperModal>
      )}
    </>
  );
};

export default ScreenDetailProduct;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white, position: 'relative' },
  ViewName: {
    flex: 1,
  },
  changeQty: {
    paddingHorizontal: 2,
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 30,
    overflow: 'hidden',
  },
  btn_changeQty: {
    padding: 2,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  viewTextInput: {
    width: 30,
    height: 40,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
  },
  ViewComment: {
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
    right: 20,
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
});

const styleSub = {
  banner: (scrollA: any) => ({
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [1, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};
