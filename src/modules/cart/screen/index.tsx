/* eslint-disable @typescript-eslint/no-shadow */
import { useScrollToTop } from '@react-navigation/native';
import { ICarts } from 'assets/data';
import { ActivityPenal, ButtonCustom, HeaderNew } from 'components';
import SwipeListViewCustom from 'components/custom/SwipeListViewCustom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'themes/Color';
import { marginVerticalItemListView, styleGlobal } from 'types/StyleGlobal';
import { formatCurrency } from 'utils';
import Item from './Item';
import ButtonAddCartNull from './buttonAddCartNull.tsx';

const CartsScreen = () => {
  const { t } = useTranslation();
  const refScrollView = React.useRef<any>();
  const [selectCheck, setSelectCheck] = React.useState<number[]>([]);
  const [data, setData] = React.useState<ICarts[]>([]);
  useScrollToTop(refScrollView);

  const totalMoney = React.useMemo(() => {
    const dataNew: ICarts[] = [];
    data?.map((d: ICarts) => {
      selectCheck?.map(i => {
        if (i === d?.id) {
          return dataNew.push(d);
        }
      });
    });

    return dataNew.reduce((total, curr) => {
      return (total += curr?.price * curr?.qty);
    }, 0);
  }, [selectCheck, data]);

  const handleRemoveItem = (data: any) => {
    // console.log(data);
  };

  const renderChildren = React.useCallback((data: any) => {
    return (
      <View style={[marginVerticalItemListView.container]}>
        <Item data={data?.item} setData={setData} />
      </View>
    );
  }, []);

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
        <Text style={styles.viewBold}>{formatCurrency(totalMoney, ' vnđ')}</Text>
      </View>
    );
  }, [totalMoney]);

  return (
    <ActivityPenal renderHeader={<HeaderNew title={t('Giỏ hàng')} />}>
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
    color: Colors.primary,
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
