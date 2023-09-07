import { useScrollToTop } from '@react-navigation/native';
import { ApiAddress } from 'assets/api';
import { IconAdd } from 'assets/icons';
import { ActivityPenal, FlatListComponent, LoadingOverley } from 'components';
import { PathName } from 'configs';
import useFetchDataList from 'hooks/useFetchDataList';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import ItemMenu from './components/ItemMenu';

const ChangeAddressScreen = () => {
  const refScrollView = React.useRef<any>();
  const func1 = React.useCallback((page: number) => ApiAddress.getAddressOrder(page, 5).then(res => res), []);
  const { data: dataList, onRefresh, loading, refreshing, hasNext, onEndReached } = useFetchDataList(func1);
  useScrollToTop(refScrollView);

  const handleChangeNewAddress = React.useCallback(() => {
    NavigationService.navigate(PathName.NEWADDRESSSCREEN);
  }, []);

  console.log(hasNext);

  const listFooterComponent = React.useCallback(
    () => <View style={[hasNext && styles.listFooterComponent]}>{hasNext && <ActivityIndicator />}</View>,
    [hasNext],
  );

  return (
    <ActivityPenal
      title="Địa chỉ của tôi"
      styleChildren={styles.container}
      rightIcon={<IconAdd fill={Colors.white} />}
      handleRight={handleChangeNewAddress}>
      {loading ? (
        <LoadingOverley visible={loading} />
      ) : (
        <FlatListComponent
          data={dataList}
          onRefresh={onRefresh}
          refreshing={refreshing || loading}
          renderItem={(data: any) => <ItemMenu item={data?.item} />}
          styleWrapper={[styleGlobal.padding_10]}
          listFooterComponent={listFooterComponent}
          onEndReached={onEndReached}
        />
      )}
    </ActivityPenal>
  );
};

export default ChangeAddressScreen;

const styles = StyleSheet.create({
  container: {},
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
});
