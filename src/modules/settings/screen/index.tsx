import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SettingScreen = () => {
  console.log('setting...');
  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
    </View>
  );
};

export default React.memo(SettingScreen);

const styles = StyleSheet.create({ container: {} });
