import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NotificationScreen = () => {
  console.log('notification...');
  return (
    <View style={styles.container}>
      <Text>NotificationScreen</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({ container: {} });
