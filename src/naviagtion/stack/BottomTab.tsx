/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { IconHeart, IconHome, IconNotifi, IconSettinguser, IconShop } from 'assets/icons';
import { PathName } from 'configs';
import { useColorPrimary } from 'hooks/useColorPrimary';
import HeartScreen from 'modules/heart/screen';
import HomeScreen from 'modules/home/screen';
import MerchentScreen from 'modules/merchent/screen';
import NotificationScreen from 'modules/notification/screen';
import SettingScreen from 'modules/settings/screen';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightFull, widthFull } from 'types/StyleGlobal';

const Stack = createBottomTabNavigator();

const BottomTab = () => {
  const { t } = useTranslation();
  const { colorPrimary } = useColorPrimary();
  const tabBarButton = React.useCallback((props: BottomTabBarButtonProps) => <TouchableOpacity {...props} />, []);
  const tabBarIcon = React.useCallback(
    (Component: React.MemoExoticComponent<(props: any) => JSX.Element>) =>
      ({ focused, color }: { focused: boolean; color: string; size: number }) =>
        <Component fill={focused ? colorPrimary : color} />,
    [],
  );
  const tabBarLabel = React.useCallback(
    (title: string) =>
      ({ focused }: { focused: boolean; color: string; position: LabelPosition }) =>
        (
          <Text
            style={StyleSheet.flatten([
              styles.textInActive,
              focused && (styles.textActive, { color: colorPrimary }),
            ])}>
            {title}
          </Text>
        ),
    [],
  );

  return (
    <View
      style={{
        width: widthFull,
        height:
          heightFull -
          Platform.select({
            ios: 0,
            android: 30,
            default: 0,
          }),
      }}>
      <Stack.Navigator
        screenOptions={{
          tabBarButton,
          // headerShown: false,
          // tabBarShowLabel: false,
          tabBarLabelStyle: { fontSize: 13, fontWeight: '700' },
          tabBarInactiveTintColor: '#808991',
          tabBarActiveTintColor: colorPrimary,
          header: () => <View style={[styles.iconBefore]} />,
          tabBarStyle: {
            position: 'relative',
            bottom: 0,
            borderTopColor: 'transparent',
            borderTopWidth: 0,
            shadowColor: 'transparent',
          },
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen
          options={{
            tabBarIcon: tabBarIcon(IconHeart),
            title: t('Ưa thích'),
            tabBarLabel: tabBarLabel(t('Ưa thích')),
          }}
          name={PathName.HEARTSCREEN}
          component={HeartScreen}
        />
        <Stack.Screen
          options={{
            tabBarIcon: tabBarIcon(IconShop),
            title: t('Cửa hàng'),
            tabBarLabel: tabBarLabel(t('Cửa hàng')),
          }}
          name={PathName.MERCHENTSCREEN}
          component={MerchentScreen}
        />
        <Stack.Screen
          options={{
            tabBarIcon: tabBarIcon(IconHome),
            title: t('Trang chủ'),
            tabBarLabel: tabBarLabel(t('Trang chủ')),
            tabBarItemStyle: {
              transform: [{ translateY: -14 }],
            },
          }}
          name={PathName.HOMESCREEN}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            tabBarIcon: tabBarIcon(IconNotifi),
            title: t('Thông báo'),
            tabBarLabel: tabBarLabel(t('Thông báo')),
          }}
          name={PathName.NOTIFICATIONSCREEN}
          component={NotificationScreen}
        />
        <Stack.Screen
          options={{
            tabBarIcon: tabBarIcon(IconSettinguser),
            title: t('Thiết lập'),
            tabBarLabel: tabBarLabel(t('Thiết lập')),
          }}
          name={PathName.SETTINGSCREEN}
          component={SettingScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default React.memo(BottomTab);

const styles = StyleSheet.create({
  textInActive: { color: '#808991', fontSize: 12, fontWeight: '400', transform: [{ translateY: -4 }] },
  textActive: { fontWeight: '700' },
  iconBefore: {
    position: 'absolute',
    right: 0,
    top:
      heightFull -
      Platform.select({
        ios: 69,
        android: 99,
        default: 0,
      }),
    borderStyle: 'solid',
    borderBottomWidth: 20,
    borderBottomColor: 'white',
    borderLeftWidth: widthFull * 0.5,
    borderRightWidth: widthFull * 0.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
});
