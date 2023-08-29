import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';

const ChangePasswordScreen = () => {
  return (
    <ActivityPenal title="Đổi mật khẩu">
      <View style={styles.container}>
        <Text>InfoShopScreen</Text>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(ChangePasswordScreen);

const styles = StyleSheet.create({ container: {} });
