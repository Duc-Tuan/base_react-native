import { ApiCategories } from 'assets/api';
import { ActivityPenal, FlatListComponent, HeaderNew } from 'components';
import Nodata from 'components/custom/Nodata';
import useFetchDataList from 'hooks/useFetchDataList';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';
import { chunkArray } from 'utils';
import ItemCategory from './ItemCategory';

const CategoriesScreen = () => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<any[]>([]);
  const [query, setQuery] = React.useState<string>();

  const func1 = React.useCallback(
    (page: number) => ApiCategories.getCategories(page, 10, query).then(res => res),
    [query],
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

  const renderItem = React.useCallback((item: any) => {
    return (
      <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
        {item?.item.map((i: any, idx: number) => (
          <ItemCategory data={i} key={idx} />
        ))}
      </View>
    );
  }, []);

  const listFooterComponent = React.useCallback(
    () => <View style={[hasNext && styles.listFooterComponent]}>{hasNext && <ActivityIndicator />}</View>,
    [hasNext],
  );

  return (
    <ActivityPenal
      renderHeader={
        <HeaderNew
          isRightIcon
          title="Thể loại sản phẩm"
          placeholder={t('Tìm kiếm tên, mã thể loại...')}
          setTextSearch={setQuery}
        />
      }>
      {loading ? (
        <View style={[styles.listFooterComponent]}>{<ActivityIndicator />}</View>
      ) : dataList?.length === 0 ? (
        <Nodata query={query} />
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

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {},
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
});
