/* eslint-disable prettier/prettier */
import { ApiProducts } from 'assets/api';
import { IconFilter } from 'assets/icons';
import IconClearUp from 'assets/icons/icon_clear_up';
import { FlatListComponent, HeaderNew } from 'components';
import ActivityPenal from 'components/ActivityPenal';
import Nodata from 'components/custom/Nodata';
import useFetchDataList from 'hooks/useFetchDataList';
import ProductItem from 'modules/components/product';
import { MerchentScreenRouteProp } from 'naviagtion/stack/NavigationRoute';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { chunkArray, hexToRgba } from 'utils';

interface IProps {
  route: MerchentScreenRouteProp;
}

const MerchentScreen: React.FC<IProps> = ({ route: { params } }) => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<any[]>([]);
  const [query, setQuery] = React.useState<string>();
  const [idCategory, setIdCategory] = React.useState<any>(params?.idCategory);

  React.useEffect(() => {
    setIdCategory(params?.idCategory);
  }, [params?.idCategory]);

  const func1 = React.useCallback(
    (page: number) => ApiProducts.getProducts(page, 10, query, idCategory).then(res => res),
    [query, idCategory],
  );

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
    () => (
      <View style={[hasNext && styles.listFooterComponent]}>
        {hasNext && <ActivityIndicator color={Colors.primary} />}
      </View>
    ),
    [hasNext],
  );

  const renderItem = React.useCallback((item: any) => {
    return (
      <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart, styleGlobal.gap_10]}>
        {item?.item.map((i: any, idx: number) => (
          <ProductItem key={idx} data={i} />
        ))}
      </View>
    );
  }, []);

  const handleSearch = (data: any) => {
    if (data === undefined || data === '') {
      return setQuery(undefined);
    } else {
      return setQuery(String(data));
    }
  };

  const handleClearUp = React.useCallback(() => {
    return setIdCategory(undefined);
  }, []);

  return (
    <ActivityPenal
      styleChildren={styles.container}
      hiddenBack
      renderHeader={
        <HeaderNew hiddenBack isUser placeholder={t('Tìm kiếm tên, mã sản phẩm...')} setTextSearch={handleSearch} />
      }>
      <View
        style={[
          styleGlobal.justifyContent_spaceBetween,
          styleGlobal.flexDirection_row,
          styleGlobal.alignItems_center,
          styleGlobal.paddingHorizontal_10,
          styleGlobal.paddingBottom_10,
        ]}>
        <View style={[styleGlobal.justifyContent_flexStart, styleGlobal.flexDirection_row]}>
          <Text style={styles.viewText}>{dataList.length} / </Text>
          <Text style={styles.viewText}>
            {totalElement} {t('Sản phẩm')}
          </Text>
        </View>

        <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
          <Text style={styles.viewText}>{t('Lọc')}</Text>
          <TouchableOpacity activeOpacity={0.9} style={[styleGlobal.padding_6, styles.viewFilter]}>
            <IconFilter fill={Colors.white} width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styleGlobal.padding_6, styles.viewFilter]}
            onPress={handleClearUp}>
            <IconClearUp fill={Colors.white} width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>

      {idCategory && (
        <View
          style={[
            styleGlobal.dFlex_center,
            styleGlobal.flexDirection_column,
            styleGlobal.paddingHorizontal_10,
            styleGlobal.paddingBottom_10,
          ]}>
          <Text style={styles.viewText}>{t('Tên thể loại: ')}</Text>
          <Text style={[styles.viewText, styleGlobal.textFontSize_16]} numberOfLines={1}>
            {params?.nameCategory}
          </Text>
        </View>
      )}

      {loading ? (
        <View style={[styles.listFooterComponent]}>{<ActivityIndicator color={Colors.primary} />}</View>
      ) : dataList?.length === 0 ? (
        <Nodata query={query ?? params?.nameCategory} />
      ) : (
        <FlatListComponent
          data={data}
          onRefresh={onRefresh}
          refreshing={refreshing || loading}
          renderItem={renderItem}
          styleWrapper={[styleGlobal.padding_10]}
          listFooterComponent={listFooterComponent}
          onEndReached={onEndReached}
        />
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
