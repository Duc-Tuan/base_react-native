/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconEmail, IconLocation, IconPhone, IconShop, IconTime } from 'assets/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from 'themes/Color';
import { heightFull, styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';
import { IMerChant } from '../type';
import { IInfoShop } from './types';

interface IProps {
  data?: IMerChant[];
}

const MenuInfo: React.FC<IProps> = ({ data }) => {
  const [dataMerchant, setDataMerchant] = React.useState<IMerChant | undefined>(data && data[0]);

  React.useEffect(() => {
    setDataMerchant(data && data[0]);
  }, [data]);

  const { t } = useTranslation();

  const styleCustom = [
    styleGlobal.dFlex_center,
    styleGlobal.justifyContent_flexStart,
    styleGlobal.marginBottom_8,
    styleGlobal.gap_10,
    styleGlobal.padding_10,
    styleGlobal.border,
    styles.grounp,
    {
      backgroundColor: hexToRgba(Colors.primary, 0.1),
    },
  ];

  const render = React.useCallback(
    (item?: IMerChant) => [
      {
        title: t('Tên cửa hàng:'),
        content: item?.merchantName ?? t('Đang cập nhật...'),
        icon: IconShop,
      },
      {
        title: t('Thời gian mở cửa:'),
        content: item?.merchantTimeOpen ?? t('Đang cập nhật...'),
        icon: IconTime,
      },
      {
        title: t('Email liên hệ:'),
        content: item?.merchantEmail ?? t('Đang cập nhật...'),
        icon: IconEmail,
      },
      {
        title: t('Số điện thoại liên hệ:'),
        content: item?.merchantPhone ?? t('Đang cập nhật...'),
        icon: IconPhone,
      },
      {
        title: t('Địa chỉ chi tiết:'),
        content: item?.merchantAddress ?? t('Đang cập nhật...'),
        icon: IconLocation,
      },
    ],
    [t],
  );

  return (
    // <ScrollView
    //   showsVerticalScrollIndicator={false}
    // onScroll={
    //   heigth > 420 && Animated.event([{ nativeEvent: { contentOffset: { y: scrollA } } }], { useNativeDriver: false })
    // }
    // scrollEventThrottle={16}
    // >
    <View style={[styles.container, styleGlobal.paddingTop_10]}>
      {render(dataMerchant)?.map((i: any, idx: number) => {
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
    // </ScrollView>
  );
};

export default MenuInfo;

const styles = StyleSheet.create({
  container: {},
  grounp: {
    borderRadius: 8,
    borderColor: hexToRgba(Colors.black, 0.2),
  },
});
