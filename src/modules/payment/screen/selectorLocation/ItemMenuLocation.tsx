/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ILocation } from 'assets/data';
import { IconCheck } from 'assets/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

interface IProps {
  item: ILocation;
  selectorLocation: ILocation;
  handleSelector: (data: ILocation) => void;
}

const ItemMenuLocation: React.FC<IProps> = ({ item, selectorLocation, handleSelector }) => {
  const { t } = useTranslation();

  const dataAddress = (data?: ILocation) => {
    return [
      { title: t('Cơ quan'), item: data?.addressOrganReceive },
      { title: t('Số điện thoại'), item: data?.addressPhoneReceive },
      { title: t('Người nhận'), item: data?.addressNameReceiver },
      { title: t('Thời gian nhận hàng'), item: data?.addressTimeReceive },
      { title: t('Địa chỉ'), item: data?.addressDetail },
    ];
  };
  return (
    <TouchableOpacity
      onPress={() => handleSelector(item)}
      activeOpacity={1}
      style={[
        styleGlobal.padding_10,
        styleGlobal.border,
        styles.container,
        {
          backgroundColor: item?._id === selectorLocation?._id ? hexToRgba(Colors.primary, 0.05) : 'transparent',
          borderColor: hexToRgba(Colors.black, 0.2),
        },
      ]}>
      {item?._id === selectorLocation?._id && (
        <View style={[styleGlobal.dflex_spaceBetween, styles.viewHeader]}>
          <View
            style={[
              styleGlobal.padding_2,
              styleGlobal.border,
              styles.viewAddressDefault,
              { borderColor: Colors.primary, transform: [{ scale: 0.6 }] },
            ]}>
            <IconCheck fill={Colors.primary} />
          </View>
        </View>
      )}

      {dataAddress(item)?.map((i: any, idx: number) => (
        <Text key={idx} style={{ color: hexToRgba(Colors.black, 0.7) }}>
          {i?.title}: <Text style={[styleGlobal.textBold, styleGlobal.textFontBold_400]}>{i?.item}</Text>
        </Text>
      ))}
    </TouchableOpacity>
  );
};

export default React.memo(ItemMenuLocation);

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    backgroundColor: Colors.white,
    borderRadius: 6,
    // marginBottom: 10,
  },
  viewHeader: {
    position: 'absolute',
    top: 10,
    right: 10,
    marginBottom: 8,
  },
  viewTextCode: {
    color: hexToRgba(Colors.black, 0.4),
  },
  viewAddressDefault: {
    borderRadius: 100,
    borderWidth: 2,
  },
  viewTextNotifi: {},
});
