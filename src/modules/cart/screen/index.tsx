import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { ActivityPenal, HeaderNew } from 'components';
import { useTranslation } from 'react-i18next';
import { useScrollToTop } from '@react-navigation/native';
import Colors from 'themes/Color';

const CartsScreen = () => {
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
      renderHeader={<HeaderNew setTextSearch={setTextSearch} placeholder={t('Tìm kiếm tên, mã sản phẩm...')} />}>
      <ScrollView
        ref={refScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
        <View>
          <Text>Cart</Text>
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(CartsScreen);

const styles = StyleSheet.create({ container: {} });
