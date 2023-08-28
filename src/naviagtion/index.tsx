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
import ChangeAddressScreen from 'modules/auth/screen/profile/changeAddress';
import ChangeInfoUserScreen from 'modules/auth/screen/profile/changeInfo';
import ChangePasswordScreen from 'modules/auth/screen/profile/changePassword';
import ChangeColorSystemScreen from 'modules/settings/screen/changeColorSystem';
import InfoShopScreen from 'modules/settings/screen/infoShop';
import OrderScreen from 'modules/settings/screen/order';

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
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.CHANGEADDRESSCREEN}
          component={ChangeAddressScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.CHANGINFOUSERCREEN}
          component={ChangeInfoUserScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.CHANGEPASSWORDCREEN}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.CHANGECOLORSYSTEMCREEN}
          component={ChangeColorSystemScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.INFOSHOPCREEN}
          component={InfoShopScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false, animation: 'fade' }}
          name={PathName.ORDERCREEN}
          component={OrderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(NavigationApp);
