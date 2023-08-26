/* eslint-disable prettier/prettier */
import { useScrollToTop } from '@react-navigation/native';
import { ButtonCustom } from 'components';
import ActivityPenal from 'components/ActivityPenal';
import HeaderNew from 'components/HeaderNew';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from 'themes/Color';

const HomeScreen = () => {
  const { t } = useTranslation();
  const refScrollView = React.useRef<any>();
  const [textSearch, setTextSearch] = React.useState<string>('');
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

  console.log('HomeScreen...');

  return (
    <ActivityPenal
      styleChildren={styles.container}
      renderHeader={
        <HeaderNew setTextSearch={setTextSearch} hiddenBack isUser placeholder={t('Tìm kiếm tên, mã sản phẩm...')} />
      }>
      <ScrollView
        ref={refScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
        <View>
          <Text>HomeScreenHomeScreenHomeScreenHomeScreenHomeScreen</Text>
        </View>

        <ButtonCustom text="ádadbnjk" />
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {},
});
