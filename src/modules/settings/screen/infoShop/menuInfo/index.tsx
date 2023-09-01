/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';
import { IInfoShop, dataInfoShop } from './types';
import { IconEmail, IconLocation, IconPhone, IconShop, IconTime } from 'assets/icons';
import { useTranslation } from 'react-i18next';
import { hexToRgba } from 'utils';
import Colors from 'themes/Color';

const MenuInfo = () => {
  const { t } = useTranslation();
  const [data, setData] = React.useState<IInfoShop>(dataInfoShop);

  const styleCustom = [
    styleGlobal.dFlex_center,
    styleGlobal.justifyContent_flexStart,
    styleGlobal.marginBottom_8,
    styleGlobal.gap_10,
    styleGlobal.padding_10,
    styleGlobal.border,
    styles.grounp,
  ];

  const render = React.useCallback(
    (item: IInfoShop) => [
      {
        title: t('Tên cửa hàng:'),
        content: item.nameShop,
        icon: IconShop,
      },
      {
        title: t('Thời gian mở cửa:'),
        content: item.timeOpen,
        icon: IconTime,
      },
      {
        title: t('Email liên hệ:'),
        content: item.email,
        icon: IconEmail,
      },
      {
        title: t('Số điện thoại liên hệ:'),
        content: item.phone,
        icon: IconPhone,
      },
      {
        title: t('Địa chỉ chi tiết:'),
        content: item.address,
        icon: IconLocation,
      },
    ],
    [t],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // onScroll={
      //   heigth > 420 && Animated.event([{ nativeEvent: { contentOffset: { y: scrollA } } }], { useNativeDriver: false })
      // }
      // scrollEventThrottle={16}
    >
      <View style={[styles.container, styleGlobal.paddingTop_10]}>
        {render(data)?.map((i: any, idx: number) => {
          const { icon: Icon, title, content } = i;
          return (
            <View style={[...styleCustom]} key={idx}>
              <Icon fill={Colors.primary} />
              <View>
                <Text style={[styleGlobal.textPrimary]}>{title} </Text>
                <Text style={[styleGlobal.textFontBold]}>{content}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default MenuInfo;

const styles = StyleSheet.create({
  container: { paddingBottom: 280 },
  grounp: {
    backgroundColor: hexToRgba(Colors.primary, 0.1),
    borderRadius: 8,
    borderColor: hexToRgba(Colors.black, 0.2),
  },
});
