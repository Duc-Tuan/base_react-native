import { ActivityPenal } from 'components';
import TabsMenu from 'components/custom/TabsMenu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import StatusOrder from './screen/status/StatusOrder';

const OrderScreen = () => {
  const { t } = useTranslation();

  const StatusOrderAll = React.useCallback(() => <StatusOrder />, []);

  const StatusOrderPendding = React.useCallback(() => <StatusOrder startOrder="WAIT_FOR_CONFIRMATION" />, []);
  const StatusOrderConfirm = React.useCallback(() => <StatusOrder startOrder="CONFIRMED" />, []);
  const StatusOrderShipping = React.useCallback(() => <StatusOrder startOrder="DELIVERED" />, []);
  const StatusOrderCancel = React.useCallback(() => <StatusOrder startOrder="CANCELED" />, []);
  const StatusOrderCompleted = React.useCallback(() => <StatusOrder startOrder="COMPLETED" />, []);

  const SceneMapTabs = {
    all: StatusOrderAll,
    cofirmPendding: StatusOrderPendding,
    cofirm: StatusOrderConfirm,
    shipping: StatusOrderShipping,
    cancel: StatusOrderCancel,
    completed: StatusOrderCompleted,
  };

  const routerTabs = React.useCallback(
    () => [
      { key: 'all', title: t('Tất cả') },
      { key: 'cofirmPendding', title: t('Chờ xác nhận') },
      { key: 'cofirm', title: t('Xác nhận') },
      { key: 'shipping', title: t('Đang vận chuyển') },
      { key: 'cancel', title: t('Hủy/Trả hàng') },
      { key: 'completed', title: t('Thanh toán') },
    ],
    [t],
  );

  return (
    <ActivityPenal title="Đơn hàng của tôi">
      <View style={[styles.container]}>
        <TabsMenu routerTabs={routerTabs} SceneMapTabs={SceneMapTabs} isDefault />
      </View>
    </ActivityPenal>
  );
};

export default React.memo(OrderScreen);

const styles = StyleSheet.create({
  container: {},
});
