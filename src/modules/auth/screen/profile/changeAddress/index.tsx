import { useScrollToTop } from '@react-navigation/native';
import { ApiAddress } from 'assets/api';
import { ILocation } from 'assets/data';
import { IconAdd } from 'assets/icons';
import { ActivityPenal, LoadingOverley } from 'components';
import { PathName } from 'configs';
import useFetchData from 'hooks/useFetchData';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import ItemMenu from './components/ItemMenu';

const ChangeAddressScreen = () => {
  const refScrollView = React.useRef<any>();
  const func1 = React.useCallback(() => ApiAddress.getAddressOrder().then(res => res), []);
  const { data: dataList, onRefresh, loading, refreshing } = useFetchData(func1);
  const styleCustom = [styleGlobal.padding_10, { paddingBottom: 0 }];
  useScrollToTop(refScrollView);

  const handleChangeNewAddress = React.useCallback(() => {
    NavigationService.navigate(PathName.NEWADDRESSSCREEN);
  }, []);

  return (
    <ActivityPenal
      title="Địa chỉ của tôi"
      styleChildren={styles.container}
      rightIcon={<IconAdd fill={Colors.white} />}
      handleRight={handleChangeNewAddress}>
      {loading ? (
        <LoadingOverley visible={loading} />
      ) : (
        <ScrollView
          ref={refScrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
          <View style={styleCustom}>
            {dataList.map((i: ILocation, idx: number) => {
              return <ItemMenu key={idx} item={i} />;
            })}
          </View>
        </ScrollView>
      )}
    </ActivityPenal>
  );
};

export default ChangeAddressScreen;

const styles = StyleSheet.create({ container: {} });
