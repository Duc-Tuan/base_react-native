/* eslint-disable prettier/prettier */
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SplashScreen from './components/splashScreen/SplashScreen';
import { screenOptionsNative } from './shareStack';
import { RootStackParamList } from './stack/NavigationRoute';
import NavigationService from './stack/NavigationService';
import BottomTab from './stack/BottomTab';
import CartsScreen from 'modules/cart/screen';
import { LoginScreen, RegisterScreen } from 'modules/auth/screen';
import { PathName } from 'configs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationApp = () => {
  const navigationRef = React.useRef<NavigationContainerRef<{}>>();

  const ref = React.useCallback((refNavigaiton: NavigationContainerRef<{}>) => {
    navigationRef.current = refNavigaiton;
    NavigationService.setTopLevelNavigator(refNavigaiton);
  }, []);

  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator screenOptions={{ ...screenOptionsNative }} initialRouteName={PathName.SPLASHSCREEN}>
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.SPLASHSCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.LOGINSCREEN}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.REGISTERsCREEN}
          component={RegisterScreen}
        />
        <Stack.Screen options={{ gestureEnabled: false, animation: 'fade' }} name="BottomTab" component={BottomTab} />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.CARTSCREEN}
          component={CartsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(NavigationApp);
