/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ActivityPenal from 'components/ActivityPenal';

const MerchentScreen = () => {
  console.log('merchent...');
  return (
    <ActivityPenal styleChildren={styles.container} hiddenBack title="MerchentScreen">
      <View>
        <Text>MerchentScreen...</Text>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(MerchentScreen);

const styles = StyleSheet.create({ container: {} });
