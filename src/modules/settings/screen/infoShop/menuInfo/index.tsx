import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';

const MenuInfo = () => {
  return (
    <View style={[styleGlobal.marginTop_10, styles.container]}>
      <Text>MenuInfo</Text>
    </View>
  );
};

export default MenuInfo;

const styles = StyleSheet.create({ container: {} });
