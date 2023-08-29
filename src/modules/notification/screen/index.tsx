/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import ActivityPenal from 'components/ActivityPenal';
import { useScrollToTop } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Colors from 'themes/Color';

const NotificationScreen = () => {
  const { t } = useTranslation();
  const refScrollView = React.useRef<any>();
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
    <ActivityPenal styleChildren={styles.container} hiddenBack title="Thông báo">
      <ScrollView
        ref={refScrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>
        <View>
          <Text>NotificationScreen...</Text>
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({ container: {} });
