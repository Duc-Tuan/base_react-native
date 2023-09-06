/* eslint-disable prettier/prettier */
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { PathName } from 'configs';
import { LoginScreen, RegisterScreen } from 'modules/auth/screen';
import ChangeAddressScreen from 'modules/auth/screen/profile/changeAddress';
import DetailAddressScreen from 'modules/auth/screen/profile/changeAddress/detailAddress';
import ChangeInfoUserScreen from 'modules/auth/screen/profile/changeInfo';
import ChangePasswordScreen from 'modules/auth/screen/profile/changePassword';
import CartsScreen from 'modules/cart/screen';
import ChangeColorSystemScreen from 'modules/settings/screen/changeColorSystem';
import InfoShopScreen from 'modules/settings/screen/infoShop';
import OrderScreen from 'modules/settings/screen/order';
import ProfileScreen from 'modules/auth/screen/profile';
import SplashScreen from './components/splashScreen/SplashScreen';
import { screenOptionsNative } from './shareStack';
import BottomTab from './stack/BottomTab';
import { RootStackParamList } from './stack/NavigationRoute';
import NavigationService from './stack/NavigationService';
import NewAddressScreen from 'modules/auth/screen/profile/changeAddress/components/NewAddress';
import CategoriesScreen from 'modules/merchent/screen/CategoriesScreen';

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
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.SPLASHSCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.LOGINSCREEN}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.REGISTERsCREEN}
          component={RegisterScreen}
        />
        <Stack.Screen options={{ gestureEnabled: true, animation: 'fade' }} name="BottomTab" component={BottomTab} />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.CARTSCREEN}
          component={CartsScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.CHANGEADDRESSSCREEN}
          component={ChangeAddressScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.CHANGINFOUSERSCREEN}
          component={ChangeInfoUserScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.CHANGEPASSWORDSCREEN}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.CHANGECOLORSYSTEMSCREEN}
          component={ChangeColorSystemScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.INFOSHOPSCREEN}
          component={InfoShopScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.ORDERSCREEN}
          component={OrderScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.DETAILADDRESSSCREEN}
          component={DetailAddressScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.PROFILESCREEN}
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.NEWADDRESSSCREEN}
          component={NewAddressScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.CATEGORIESSCREEN}
          component={CategoriesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(NavigationApp);
