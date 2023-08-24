/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ActivityPenal from 'components/ActivityPenal';

const HeartScreen = () => {
  console.log('Heart...');

  return (
    <ActivityPenal styleChildren={styles.container} hiddenBack title="HeartScreen">
      <View>
        <Text>HeartScreen...</Text>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(HeartScreen);

const styles = StyleSheet.create({
  container: {},
});
