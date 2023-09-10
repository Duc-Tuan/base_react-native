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
import codePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

dayjs.locale('vi');

import 'i18n';

import store from 'store';
import { toastConfig } from './src/configs/toast';

const NavigationApp = React.lazy(() => import('naviagtion'));

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ClickOutsideProvider>
          <Suspense fallback={undefined}>
            <ActionSheetProvider>
              <NavigationApp />
            </ActionSheetProvider>
          </Suspense>
        </ClickOutsideProvider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
}

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
export default codePush(codePushOptions)(App);
