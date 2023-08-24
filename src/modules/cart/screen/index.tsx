import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CartsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CartsScreen</Text>
    </View>
  );
};

export default React.memo(CartsScreen);

const styles = StyleSheet.create({ container: {} });
