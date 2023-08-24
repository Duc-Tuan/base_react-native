/* eslint-disable prettier/prettier */
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SplashScreen from './components/splashScreen/SplashScreen';
import { screenOptionsNative } from './shareStack';
import { RootStackParamList } from './stack/NavigationRoute';
import NavigationService from './stack/NavigationService';
import BottomTab from './stack/BottomTab';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationApp = () => {
  const navigationRef = React.useRef<NavigationContainerRef<{}>>();

  const ref = React.useCallback((refNavigaiton: NavigationContainerRef<{}>) => {
    navigationRef.current = refNavigaiton;
    NavigationService.setTopLevelNavigator(refNavigaiton);
  }, []);

  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator screenOptions={{ ...screenOptionsNative }} initialRouteName="SplashScreen">
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen options={{ gestureEnabled: false, animation: 'fade' }} name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(NavigationApp);
