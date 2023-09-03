import { ActivityPenal } from 'components';
import TabsMenu from 'components/custom/TabsMenu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import StatusOrder from './screen/status/StatusOrder';

const OrderScreen = () => {
  const { t } = useTranslation();
  const SceneMapTabs = {
    all: StatusOrder,
    cofirm: StatusOrder,
    shipping: StatusOrder,
    cancel: StatusOrder,
    pay: StatusOrder,
  };

  const routerTabs = React.useCallback(
    () => [
      { key: 'all', title: t('Tất cả') },
      { key: 'cofirm', title: t('Chờ xác nhận') },
      { key: 'shipping', title: t('Đang vận chuyển') },
      { key: 'cancel', title: t('Hủy/Trả hàng') },
      { key: 'pay', title: t('Thanh toán') },
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
