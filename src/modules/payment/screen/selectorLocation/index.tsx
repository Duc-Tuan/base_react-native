import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { ButtonCustom, FlatListComponent } from 'components';
import { styleGlobal } from 'types/StyleGlobal';
import { ApiAddress } from 'assets/api';
import useFetchDataList from 'hooks/useFetchDataList';
import ItemMenuLocation from './ItemMenuLocation';
import { ILocation } from 'assets/data';
import { useAppDispatch } from 'hooks';
import { actions as actionsAuths } from 'modules/auth/store';

interface IProps {
  isCallApi: boolean;
  hiddenPopup: () => void;
  location: ILocation;
}

const Selectorlocation: React.FC<IProps> = ({ isCallApi, hiddenPopup, location }) => {
  const func1 = React.useCallback((page: number) => ApiAddress.getAddressOrder(page, 5).then(res => res), []);
  const [selectorLocation, setSelectorLocation] = React.useState<ILocation>(location);
  const { data: dataList, onRefresh, loading, refreshing, hasNext, onEndReached } = useFetchDataList(func1);
  const dispatch = useAppDispatch();

  const listFooterComponent = React.useCallback(
    () => <View style={[hasNext && styles.listFooterComponent]}>{hasNext && <ActivityIndicator />}</View>,
    [hasNext],
  );

  const handleSelector = React.useCallback((data: ILocation) => {
    setSelectorLocation(data);
  }, []);

  const handleSelectorLocation = React.useCallback(() => {
    dispatch(actionsAuths.updateLocation(selectorLocation));
    hiddenPopup();
  }, [selectorLocation]);

  return (
    <View style={{ height: '100%' }}>
      <View style={{ height: '90%', paddingTop: 4 }}>
        <FlatListComponent
          data={dataList}
          onRefresh={onRefresh}
          refreshing={refreshing || loading}
          renderItem={(data: any) => (
            <ItemMenuLocation item={data?.item} selectorLocation={selectorLocation} handleSelector={handleSelector} />
          )}
          styleWrapper={[styleGlobal.padding_10]}
          listFooterComponent={listFooterComponent}
          onEndReached={onEndReached}
        />
      </View>
      <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.padding_10, styles.ViewFooter]}>
        <ButtonCustom styleButton={[styleGlobal.flex_1]} text="Chọn ngay" action={handleSelectorLocation} />
        <ButtonCustom styleButton={[styleGlobal.flex_1]} text="Hủy" typeButton="outline-main" action={hiddenPopup} />
      </View>
    </View>
  );
};

export default Selectorlocation;

const styles = StyleSheet.create({
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
  ViewFooter: {},
});
