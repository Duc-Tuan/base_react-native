/* eslint-disable react/no-unstable-nested-components */
import { ApiMerchant } from 'assets/api';
import { ActivityPenal, LoadingOverley } from 'components';
import TabsMenu from 'components/custom/TabsMenu';
import useFetchData from 'hooks/useFetchData';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Animated, RefreshControl, ScrollView, Share, StyleSheet, View } from 'react-native';
import Colors from 'themes/Color';
import { heightFull, styleGlobal } from 'types/StyleGlobal';
import DisplayImage from './imageShop/DisplayImage';
import MenuInfo from './menuInfo';
import MenuMap from './menuMap';
export const BANNER_H = 180;
export const TOPNAVI_H = 50;

const InfoShopScreen = () => {
  const { t } = useTranslation();
  const refScrollView = React.useRef<any>();
  // const scrollA = React.useRef(new Animated.Value(0)).current;
  const func1 = React.useCallback(() => ApiMerchant.getMerchant().then(res => res), []);
  const { data: dataList, onRefresh, loading, refreshing } = useFetchData(func1);

  const routerTabs = React.useCallback(
    () => [
      { key: 'map', title: t('Địa chỉ') },
      { key: 'info', title: t('Thông tin') },
    ],
    [t],
  );

  const ViewMap = React.useCallback(() => {
    return <MenuMap data={dataList} />;
  }, [dataList]);

  const ViewMenuInfo = React.useCallback(() => {
    return <MenuInfo data={dataList} />;
  }, [dataList]);

  const SceneMapTabs = {
    map: ViewMap,
    info: ViewMenuInfo,
  };

  const onShare = React.useCallback(async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, []);

  return (
    <ActivityPenal title="Thông tin cửa hàng">
      {loading ? (
        <LoadingOverley visible={loading} />
      ) : (
        <ScrollView
          ref={refScrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
          <View style={[styleGlobal.marginTop_10, styles.container]}>
            <Animated.View
            // style={{ ...styleSub.banner(scrollA) }}
            >
              <DisplayImage data={dataList} />
            </Animated.View>
            <View style={[styleGlobal.padding_14]}>
              <TabsMenu SceneMapTabs={SceneMapTabs} routerTabs={routerTabs} isShare handleShare={onShare} />
            </View>
          </View>
        </ScrollView>
      )}
    </ActivityPenal>
  );
};

// const styleSub = {
//   banner: (scrollA: any) => ({
//     overflow: 'hidden',
//     height: scrollA.interpolate({
//       inputRange: [0, BANNER_H],
//       outputRange: [BANNER_H, 0],
//       extrapolate: 'clamp',
//     }),
//     transform: [
//       {
//         translateY: scrollA.interpolate({
//           inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
//           outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
//         }),
//       },
//       {
//         scale: scrollA.interpolate({
//           inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
//           outputRange: [1, 1, 0.5, 0.5],
//         }),
//       },
//     ],
//   }),
// };

export default React.memo(InfoShopScreen);

const styles = StyleSheet.create({ container: { height: heightFull - 90, backgroundColor: Colors.white } });
