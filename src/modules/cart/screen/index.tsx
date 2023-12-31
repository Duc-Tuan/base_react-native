/* eslint-disable @typescript-eslint/no-shadow */
import { useScrollToTop } from '@react-navigation/native';
import { ActivityPenal, ButtonCustom, HeaderNew } from 'components';
import SwipeListViewCustom from 'components/custom/SwipeListViewCustom';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'themes/Color';
import { marginVerticalItemListView, styleGlobal } from 'types/StyleGlobal';
import { formatCurrency } from 'utils';
import Item from './Item';
import ButtonAddCartNull from './buttonAddCartNull.tsx';
import useGetCart from 'hooks/useGetCart';
import { ICartsData, IPayments } from 'types/cart-types';
import { useAppDispatch } from 'hooks';
import { actions as actionsCarts } from 'modules/cart/store';
import { useToast } from 'hooks/useToast';
import { cloneDeep, filter } from 'lodash';
import { actions as actionsPayment } from 'modules/payment/store';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import { useDebounceCallback } from 'hooks/useDebounceCallback';

const CartsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const refScrollView = React.useRef<any>();
  const [selectCheck, setSelectCheck] = React.useState<number[]>([]);
  const [data, setData] = React.useState<ICartsData[]>([]);
  const { carts } = useGetCart();

  React.useEffect(() => {
    setData(carts);
  }, [carts]);

  useScrollToTop(refScrollView);

  const totalMoney = React.useMemo(() => {
    const dataNew: ICartsData[] = [];
    data?.map((d: ICartsData) => {
      selectCheck?.map(i => {
        if (i === d?._id) {
          return dataNew.push(d);
        }
      });
    });

    return dataNew.reduce((total: number, curr: ICartsData) => {
      return (total += curr?.productprice * curr?.qty);
    }, 0);
  }, [selectCheck, data]);

  const handleRemoveItem = async (i: any) => {
    try {
      const res = await dispatch(actionsCarts.deleteCarts({ productId: i?._id }));
      const { payload }: any = res;
      if (payload?.status) {
        const dataOld = cloneDeep(selectCheck);
        const dataNews = dataOld?.filter((d: number) => d?.toString() !== i?._id?.toString());
        setSelectCheck(dataNews);
      }

      toast(payload?.status ? 'success' : 'error', payload?.mess);
    } catch (error) {}
  };

  const renderChildren = React.useCallback(
    (i: any) => {
      return (
        <View style={[marginVerticalItemListView.container]}>
          <Item data={i?.item} />
        </View>
      );
    },
    [data],
  );

  const renderfooter = React.useCallback(() => {
    return (
      <View
        style={[
          styleGlobal.padding_8,
          styleGlobal.flexDirection_row,
          styleGlobal.justifyContent_spaceBetween,
          styles.containerFooter,
        ]}>
        <Text style={{ color: Colors.black }}>Tổng thanh toán:</Text>
        <Text style={[styles.viewBold, { color: Colors.primary }]}>{formatCurrency(totalMoney, ' vnđ')}</Text>
      </View>
    );
  }, [totalMoney]);

  const handlePay = () => {
    const dataOld: IPayments[] = [];
    data?.map((d: ICartsData) => {
      selectCheck?.map((i: any) => {
        if (d?._id.toString() === i.toString()) {
          const dataNew: IPayments = {
            _id: d?._id,
            name: d?.productname,
            image: d?.productimage,
            promotion: d?.productpromotion,
            qty: d?.qty,
            price: d?.productprice,
          };
          return dataOld.push(dataNew);
        }
      });
    });
    dispatch(actionsPayment.addPayments(dataOld));
    return NavigationService.navigate(PathName.PAYMENTSSCREEN);
  };

  const handleSearchChange = (value: string) => {
    if (value === undefined || value === '') {
      return setData(carts);
    }
    const otps: any = filter(carts, (entity: ICartsData) => {
      return entity?.productname?.toLowerCase()?.trim()?.includes(value?.toLowerCase()?.trim());
    });
    setData(otps);
  };
  
  return (
    <ActivityPenal
      renderHeader={
        <HeaderNew title="Giỏ hàng" setTextSearch={handleSearchChange} placeholder="Tìm kiếm theo tên sản phẩm..." />
      }>
      <View style={styles.container}>
        {data?.length !== 0 ? (
          <View style={styles.viewList}>
            <SwipeListViewCustom
              data={data}
              handleRemoveItem={handleRemoveItem}
              renderItem={renderChildren}
              ListFooterComponent={renderfooter}
              isCheckAll
              setSelectCheck={setSelectCheck}
              selectCheck={selectCheck}
            />
          </View>
        ) : (
          <ButtonAddCartNull />
        )}

        <View style={[styleGlobal.padding_10, styles.viewButtonOrder]}>
          <ButtonCustom
            text={t('Mua hàng')}
            styleButton={styles.viewButton}
            disabled={selectCheck?.length !== 0 ? false : true}
            typeButton={selectCheck?.length !== 0 ? 'main' : 'disabled'}
            action={handlePay}
          />
        </View>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(CartsScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerFooter: { backgroundColor: Colors.white, paddingVertical: 10 },
  viewBold: {
    fontSize: 14,
    fontWeight: '700',
  },
  viewButtonOrder: {
    backgroundColor: Colors.white,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  viewButton: {
    width: '100%',
    maxWidth: '100%',
  },
  viewList: {
    marginBottom: 50,
  },
});
