/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ActivityPenal from 'components/ActivityPenal';

const SettingScreen = () => {
  console.log('setting...');
  return (
    <ActivityPenal styleChildren={styles.container} hiddenBack title="SettingScreen">
      <View>
        <Text>SettingScreen...</Text>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(SettingScreen);

const styles = StyleSheet.create({ container: {} });
