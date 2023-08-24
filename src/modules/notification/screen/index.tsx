/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ActivityPenal from 'components/ActivityPenal';

const NotificationScreen = () => {
  console.log('notification...');
  return (
    <ActivityPenal styleChildren={styles.container} hiddenBack title="NotificationScreen">
      <View>
        <Text>NotificationScreen...</Text>
      </View>
    </ActivityPenal>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({ container: {} });
