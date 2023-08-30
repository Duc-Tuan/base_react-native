import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';

const MenuMap = () => {
  return (
    <View style={[styleGlobal.marginTop_10, styles.container]}>
      <Text>MenuMap</Text>
    </View>
  );
};

export default MenuMap;

const styles = StyleSheet.create({ container: {} });
