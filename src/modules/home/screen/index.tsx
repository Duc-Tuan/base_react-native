/* eslint-disable prettier/prettier */
import { useScrollToTop } from '@react-navigation/native';
import ActivityPenal from 'components/ActivityPenal';
import HeaderNew from 'components/HeaderNew';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import Colors from 'themes/Color';
import ViewProduct from './ViewProduct';
import ViewCategories from './viewCategoryies';
import { styleGlobal } from 'types/StyleGlobal';
import ViewBanner from './viewBanner';

const HomeScreen = () => {
  const { t } = useTranslation();
  const refScrollView = React.useRef<any>();
  const refViewProduct = React.useRef<any>();
  const refViewBanners = React.useRef<any>();
  const refViewCategories = React.useRef<any>();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  useScrollToTop(refScrollView);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([
        refViewProduct?.current?.onRefresh(),
        refViewCategories?.current?.onRefresh(),
        refViewBanners?.current?.onRefresh(),
      ]);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <ActivityPenal renderHeader={<HeaderNew hiddenBack isUser hiddenSearch />}>
      <ScrollView
        ref={refScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
        <View style={[styleGlobal.padding_10, styleGlobal.gap_20, styles.container]}>
          <ViewBanner ref={refViewBanners} />
          <ViewCategories ref={refViewCategories} />
          <ViewProduct ref={refViewProduct} />
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: { paddingBottom: 30, paddingTop: 0 },
  imageRefresh: { width: 16, height: 16 },
  viewButtonRefresh: {
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
