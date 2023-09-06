import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';

const CategoriesScreen = () => {
  return (
    <ActivityPenal title="Thể loại sản phẩm">
      <View style={styles.container}>
        <Text>CategoriesScreen</Text>
      </View>
    </ActivityPenal>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({ container: {} });
