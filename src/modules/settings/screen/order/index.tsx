import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';

const OrderScreen = () => {
  return (
    <ActivityPenal title="Đơn hàng của tôi">
      <View style={styles.container}>
        <Text>OrderScreen</Text>
      </View>
    </ActivityPenal>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({ container: {} });
