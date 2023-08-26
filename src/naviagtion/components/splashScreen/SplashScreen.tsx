/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { heightFull, styleGlobal, widthFull } from '../../../types/StyleGlobal';
import NavigationService from 'naviagtion/stack/NavigationService';

const SplashScreen = () => {

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      NavigationService.replace('BottomTab');
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('assets/images/app.png')} style={[styleGlobal.image]} />
    </View>
  );
};

export default React.memo(SplashScreen);

const styles = StyleSheet.create({
  container: {
    width: widthFull,
    height: heightFull,
    position: 'relative',
  },
});
