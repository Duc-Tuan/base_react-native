import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CategoryItem = () => {
  return (
    <View style={styles.container}>
      <Text>CategoryItem</Text>
    </View>
  );
};

export default React.memo(CategoryItem);

const styles = StyleSheet.create({ container: {} });
