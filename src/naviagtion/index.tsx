/* eslint-disable prettier/prettier */
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PathName } from 'configs';
import { useAppDispatch } from 'hooks';
import { useToast } from 'hooks/useToast';
import { LoginScreen, RegisterScreen } from 'modules/auth/screen';
import ScreenResetPassword from 'modules/auth/screen/ResetPassword';
import ProfileScreen from 'modules/auth/screen/profile';
import ChangeAddressScreen from 'modules/auth/screen/profile/changeAddress';
import NewAndEditAddress from 'modules/auth/screen/profile/changeAddress/components/NewAndEditAddress';
import ChangePasswordScreen from 'modules/auth/screen/profile/changePassword';
import { actions as actionAuths } from 'modules/auth/store';
import CartsScreen from 'modules/cart/screen';
import CategoriesScreen from 'modules/merchent/screen/CategoriesScreen';
import ChangeColorSystemScreen from 'modules/settings/screen/changeColorSystem';
import InfoShopScreen from 'modules/settings/screen/infoShop';
import OrderScreen from 'modules/settings/screen/order';
import { setHeaders } from 'store/axios';
import SplashScreen from './components/splashScreen/SplashScreen';
import { screenOptionsNative } from './shareStack';
import BottomTab from './stack/BottomTab';
import { RootStackParamList } from './stack/NavigationRoute';
import NavigationService from './stack/NavigationService';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationApp = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigationRef = React.useRef<NavigationContainerRef<{}>>();

  const ref = React.useCallback((refNavigaiton: NavigationContainerRef<{}>) => {
    navigationRef.current = refNavigaiton;
    NavigationService.setTopLevelNavigator(refNavigaiton);
  }, []);

  const autoLogin = React.useCallback(async () => {
    const token: any = await AsyncStorage.getItem('token');
    setHeaders({ 'x-food-access-token': token });
    token &&
      (await dispatch(actionAuths.autologin())
        .then(async (data: any) => {
          if (data?.payload?.status) {
            toast('success', 'Đăng nhập thành công.');
          } else {
            toast('error', data?.payload?.mess);
          }
        })
        .catch((error: any) => {
          console.log(error);
        }));
  }, [dispatch, toast]);

  React.useEffect(() => {
    autoLogin();
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
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.RESETPASSWORDSCREEN}
          component={ScreenResetPassword}
        />
        <Stack.Screen options={{ gestureEnabled: false, animation: 'fade' }} name="BottomTab" component={BottomTab} />
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
          name={PathName.PROFILESCREEN}
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: true, animation: 'fade' }}
          name={PathName.NEWANDEDITADDRESSSCREEN}
          component={NewAndEditAddress}
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
