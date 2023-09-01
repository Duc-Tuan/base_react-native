import { ActivityPenal } from 'components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderScreen = () => {
  return (
    <ActivityPenal title="Đơn hàng của tôi">
      <View style={[styles.container]}>
        <Text>OrderScreen</Text>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(OrderScreen);

const styles = StyleSheet.create({
  container: {},
});
