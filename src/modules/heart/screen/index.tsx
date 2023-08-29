/* eslint-disable prettier/prettier */
import { useScrollToTop } from '@react-navigation/native';
import { HeaderNew } from 'components';
import ActivityPenal from 'components/ActivityPenal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import Colors from 'themes/Color';

const HeartScreen = () => {
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

  return (
    <ActivityPenal
      styleChildren={styles.container}
      hiddenBack
      renderHeader={
        <HeaderNew setTextSearch={setTextSearch} hiddenBack isUser placeholder={t('Tìm kiếm tên, mã sản phẩm...')} />
      }>
      <ScrollView
        ref={refScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
        <View>
          <Text>HeartScreen...</Text>
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(HeartScreen);

const styles = StyleSheet.create({
  container: {},
});
