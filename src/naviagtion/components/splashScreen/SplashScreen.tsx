/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { useAppSelector } from 'hooks';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import { setColorPrimary } from 'themes/Color';
import { heightFull, styleGlobal, widthFull } from '../../../types/StyleGlobal';

const SplashScreen = () => {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const colorPrimary = useAppSelector((state: any) => state?.settings?.colorPrimary);

  React.useEffect(() => {
    setColorPrimary(colorPrimary);
    const timeout = setTimeout(() => {
      NavigationService.replace('BottomTab');
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [colorPrimary]);

  React.useEffect(() => {
    const setTimner = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 1400);

    return () => {
      clearTimeout(setTimner);
    };
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('assets/images/app.png')} style={[styleGlobal.viewImage]} />
    </Animated.View>
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
