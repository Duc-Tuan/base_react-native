/* eslint-disable prettier/prettier */
import { ApiProducts } from 'assets/api';
import { IconFilter } from 'assets/icons';
import { FlatListComponent, HeaderNew, LoadingOverley } from 'components';
import ActivityPenal from 'components/ActivityPenal';
import useFetchDataList from 'hooks/useFetchDataList';
import ProductItem from 'modules/components/product';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { chunkArray, hexToRgba } from 'utils';

const MerchentScreen = () => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<any[]>([]);
  const func1 = React.useCallback((page: number) => ApiProducts.getProducts(page, 10).then(res => res), []);
  const {
    data: dataList,
    onRefresh,
    loading,
    totalElement,
    refreshing,
    hasNext,
    onEndReached,
  } = useFetchDataList(func1);

  React.useEffect(() => {
    var result = chunkArray(dataList, 2);
    setData(result);
  }, [dataList]);

  const listFooterComponent = React.useCallback(
    () => <View style={[hasNext && styles.listFooterComponent]}>{hasNext && <ActivityIndicator />}</View>,
    [hasNext],
  );

  const renderItem = React.useCallback((item: any) => {
    return (
      <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
        {item?.item.map((i: any, idx: number) => (
          <ProductItem key={idx} data={i} />
        ))}
      </View>
    );
  }, []);

  return (
    <ActivityPenal
      styleChildren={styles.container}
      hiddenBack
      renderHeader={<HeaderNew hiddenBack isUser placeholder={t('Tìm kiếm tên, mã sản phẩm...')} />}>
      {loading ? (
        <LoadingOverley visible={loading} />
      ) : (
        <>
          <View
            style={[
              styleGlobal.justifyContent_spaceBetween,
              styleGlobal.flexDirection_row,
              styleGlobal.alignItems_center,
              styleGlobal.padding_10,
            ]}>
            <View style={[styleGlobal.justifyContent_flexStart, styleGlobal.flexDirection_row]}>
              <Text style={styles.viewText}>{dataList.length} / </Text>
              <Text style={styles.viewText}>
                {totalElement} {t('Sản phẩm')}
              </Text>
            </View>

            <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
              <Text style={styles.viewText}>{t('Lọc')}</Text>
              <TouchableOpacity activeOpacity={1} style={[styleGlobal.padding_6, styles.viewFilter]}>
                <IconFilter fill={Colors.white} width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>

          <FlatListComponent
            data={data}
            onRefresh={onRefresh}
            refreshing={refreshing || loading}
            renderItem={renderItem}
            styleWrapper={[styleGlobal.padding_10]}
            listFooterComponent={listFooterComponent}
            onEndReached={onEndReached}
          />
        </>
      )}
    </ActivityPenal>
  );
};

export default React.memo(MerchentScreen);

const styles = StyleSheet.create({
  container: {},
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
  viewText: {
    color: Colors.white,
    fontWeight: '700',
  },
  viewFilter: {
    backgroundColor: hexToRgba(Colors.white, 0.6),
    borderRadius: 100,
  },
});
