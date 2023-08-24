import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HeartScreen = () => {
  console.log('Heart...');

  return (
    <View style={styles.container}>
      <Text>HeartScreen</Text>
    </View>
  );
};

export default React.memo(HeartScreen);

const styles = StyleSheet.create({
  container: {},
});
