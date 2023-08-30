/* eslint-disable react/no-unstable-nested-components */
import { ActivityPenal } from 'components';
import TabsMenu from 'components/custom/TabsMenu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, View } from 'react-native';
import Colors from 'themes/Color';
import { heightFull, styleGlobal } from 'types/StyleGlobal';
import DisplayImage from './imageShop/DisplayImage';
import MenuInfo from './menuInfo';
import MenuMap from './menuMap';
export const BANNER_H = 180;
export const TOPNAVI_H = 50;

const InfoShopScreen = () => {
  const { t } = useTranslation();
  const scrollA = React.useRef(new Animated.Value(0)).current;

  const MenuMapNew = () => <MenuMap scrollA={scrollA} />;

  const MenuInfoNew = () => <MenuInfo scrollA={scrollA} />;

  const routerTabs = [
    { key: 'map', title: t('Địa chỉ') },
    { key: 'info', title: t('Thông tin') },
  ];

  const SceneMapTabs = {
    map: MenuMapNew,
    info: MenuInfoNew,
  };

  return (
    <ActivityPenal title="Thông tin cửa hàng">
      <View style={[styleGlobal.marginTop_10, styles.container]}>
        <Animated.View style={{ ...styleSub.banner(scrollA) }}>
          <DisplayImage />
        </Animated.View>
        <View style={[styleGlobal.padding_14]}>
          <TabsMenu SceneMapTabs={SceneMapTabs} routerTabs={routerTabs} isShare />
        </View>
      </View>
    </ActivityPenal>
  );
};

const styleSub = {
  banner: (scrollA: any) => ({
    overflow: 'hidden',
    height: scrollA.interpolate({
      inputRange: [0, BANNER_H],
      outputRange: [BANNER_H, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [1, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};

export default React.memo(InfoShopScreen);

const styles = StyleSheet.create({ container: { height: heightFull, backgroundColor: Colors.white } });
