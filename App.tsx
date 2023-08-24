/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, { Suspense } from 'react';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';
dayjs.locale('vi');

import 'i18n';

enableScreens();

import { toastConfig } from './src/configs/toast';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const NavigationApp = React.lazy(() => import('naviagtion'));

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ClickOutsideProvider>
        <Suspense fallback={undefined}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <NavigationApp />
          </TouchableWithoutFeedback>
        </Suspense>
      </ClickOutsideProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

export default App;
