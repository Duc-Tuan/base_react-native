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
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

dayjs.locale('vi');

import 'i18n';

import { toastConfig } from './src/configs/toast';
import store from 'store';

const NavigationApp = React.lazy(() => import('naviagtion'));

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ClickOutsideProvider>
          <Suspense fallback={undefined}>
            <NavigationApp />
          </Suspense>
        </ClickOutsideProvider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
