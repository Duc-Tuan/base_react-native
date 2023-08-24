import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MerchentScreen = () => {
  console.log('merchent...');
  return (
    <View style={styles.container}>
      <Text>MerchentScreen</Text>
    </View>
  );
};

export default React.memo(MerchentScreen);

const styles = StyleSheet.create({ container: {} });
