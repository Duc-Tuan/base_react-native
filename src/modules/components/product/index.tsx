import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ProductItem = () => {
  return (
    <View style={styles.container}>
      <Text>ProductItem</Text>
    </View>
  );
};

export default React.memo(ProductItem);

const styles = StyleSheet.create({ container: {} });
