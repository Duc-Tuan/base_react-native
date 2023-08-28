import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';

const ChangeColorSystemScreen = () => {
  return (
    <ActivityPenal styleChildren={styles.container} title="Đổi màu hệ thống">
      <Text>ChangeColorSystemScreen</Text>

      <View></View>
    </ActivityPenal>
  );
};

export default ChangeColorSystemScreen;

const styles = StyleSheet.create({ container: {} });
