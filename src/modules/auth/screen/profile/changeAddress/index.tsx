import { ActivityPenal } from 'components';
import React from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';
import ItemMenu from './components/ItemMenu';
import { ILocation, dataLocation } from 'assets/data';
import { useScrollToTop } from '@react-navigation/native';
import Colors from 'themes/Color';
import { IconAdd } from 'assets/icons';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';

const ChangeAddressScreen = () => {
  const refScrollView = React.useRef<any>();
  const [data, setData] = React.useState<ILocation[]>(dataLocation ?? []);
  const styleCustom = [styleGlobal.padding_10, { paddingBottom: 0 }];
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  useScrollToTop(refScrollView);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      // await Promise.all([
      //   refChart.current?.onRefresh(),
      // ]);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleChangeNewAddress = React.useCallback(() => {
    NavigationService.navigate(PathName.NEWADDRESSSCREEN);
  }, []);

  return (
    <ActivityPenal
      title="Địa chỉ của tôi"
      styleChildren={styles.container}
      rightIcon={<IconAdd fill={Colors.white} />}
      handleRight={handleChangeNewAddress}>
      <ScrollView
        ref={refScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
        <View style={styleCustom}>
          {data.map((i: any, idx: number) => {
            return <ItemMenu key={idx} item={i} />;
          })}
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default ChangeAddressScreen;

const styles = StyleSheet.create({ container: {} });
