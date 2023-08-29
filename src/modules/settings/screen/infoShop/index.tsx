import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';

const InfoShopScreen = () => {
  return (
    <ActivityPenal title="Thông tin cửa hàng">
      <View style={styles.container}>
        <Text>InfoShopScreen</Text>
      </View>
    </ActivityPenal>
  );
};

export default InfoShopScreen;

const styles = StyleSheet.create({ container: {} });
