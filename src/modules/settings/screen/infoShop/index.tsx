import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';
import TabsMenu from 'components/custom/TabsMenu';
import MenuMap from './menuMap';
import MenuInfo from './menuInfo';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { useTranslation } from 'react-i18next';
import DisplayImage from './imageShop/DisplayImage';

const InfoShopScreen = () => {
  const { t } = useTranslation();
  const routerTabs = [
    { key: 'map', title: t('Địa chỉ') },
    { key: 'info', title: t('Thông tin') },
  ];
  const SceneMapTabs = {
    map: MenuMap,
    info: MenuInfo,
  };
  return (
    <ActivityPenal title="Thông tin cửa hàng">
      <View style={[styleGlobal.marginTop_10, styleGlobal.padding_14, styles.container]}>
        <DisplayImage />
        <TabsMenu SceneMapTabs={SceneMapTabs} routerTabs={routerTabs} isShare />
      </View>
    </ActivityPenal>
  );
};

export default React.memo(InfoShopScreen);

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: Colors.white } });
