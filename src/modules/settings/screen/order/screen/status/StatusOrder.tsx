import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import ApiOrder from 'assets/api/ApiOrder';
import { useGetAccount } from 'hooks/useGetAccount';
import useFetchDataList from 'hooks/useFetchDataList';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';
import { FlatListComponent } from 'components';
import Emty from 'components/Emty';
import ItemOrder from './ItemOrder';

interface IProps {
  startOrder?:
    | 'WAIT_FOR_CONFIRMATION'
    | 'CONFIRMED'
    | 'DELIVERED_ONLY'
    | 'DELIVERED'
    | 'SUSS_DELIVERY'
    | 'COMPLETED'
    | 'CANCELED';
}

const StatusOrder: React.FC<IProps> = ({ startOrder }) => {
  const { t } = useTranslation();
  const { token } = useGetAccount();

  const func1 = React.useCallback(
    (page: number) => ApiOrder.getOrder(token, page, 2, startOrder).then(res => res),
    [startOrder],
  );

  const { data: dataList, onRefresh, loading, refreshing, hasNext, onEndReached, setData } = useFetchDataList(func1);

  const listFooterComponent = React.useCallback(
    () => (
      <View style={[hasNext && styles.listFooterComponent]}>
        {hasNext && <ActivityIndicator color={Colors.primary} />}
      </View>
    ),
    [hasNext],
  );

  const renderItem = React.useCallback(
    (item: any) => {
      return <ItemOrder data={item?.item} />;
    },
    [startOrder],
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.listFooterComponent]}>{<ActivityIndicator color={Colors.primary} />}</View>
      ) : dataList?.length === 0 ? (
        <Emty text="Hiện chưa có đơn hàng ở trạng thái này." />
      ) : (
        <FlatListComponent
          data={dataList}
          onRefresh={onRefresh}
          refreshing={refreshing || loading}
          renderItem={renderItem}
          styleWrapper={[styleGlobal.padding_10]}
          listFooterComponent={listFooterComponent}
          onEndReached={onEndReached}
        />
      )}
    </View>
  );
};

export default StatusOrder;

const styles = StyleSheet.create({
  container: { height: '100%', position: 'relative' },
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
});
