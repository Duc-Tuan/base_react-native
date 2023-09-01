import { ILocation } from 'assets/data';
import { IconDelete } from 'assets/icons';
import { PathName } from 'configs';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

interface IProps {
  item?: ILocation;
}

interface ILocationDetail {
  Wards: string;
  District: string;
  city: string;
  addressDetail: string;
  phone: string;
  organ: string;
  deliveryTime: string;
}

const ItemMenu: React.FC<IProps> = ({ item }) => {
  const { t } = useTranslation();
  const dataAddress = (data?: ILocationDetail) => {
    return [
      { title: t('Cơ quan'), item: data?.organ },
      { title: t('Số điện thoại'), item: data?.phone },
      { title: t('Thời gian nhận hàng'), item: data?.deliveryTime },
      { title: t('Địa chỉ'), item: data?.addressDetail },
    ];
  };

  const goToScreen = React.useCallback(() => {
    NavigationService.navigate(PathName.DETAILADDRESSSCREEN, item || {});
  }, [item]);

  const handleDelete = () => {
    // console.log(item);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => goToScreen()}
      style={[styleGlobal.padding_10, styleGlobal.boxshadow, styleGlobal.border, styles.container]}>
      <View style={[styleGlobal.dflex_spaceBetween, styles.viewHeader]}>
        <View style={[styleGlobal.dFlex_center, styleGlobal.gap_6]}>
          <Text style={styles.viewTextCode}>{item?.code}</Text>
          {item?.default && (
            <View
              style={[
                styleGlobal.dflex_spaceBetween,
                styleGlobal.padding_2,
                styles.viewAddressDefault,
                { backgroundColor: hexToRgba(Colors.primary, 0.2) },
              ]}>
              <Text style={[styleGlobal.textFontBold, { color: Colors.primary }]}>{t('Mặc định')}</Text>
            </View>
          )}
        </View>

        {!item?.default && (
          <TouchableOpacity
            onPress={handleDelete}
            style={[styleGlobal.buttonActionsCirc, styleGlobal.padding_6]}
            activeOpacity={0.8}>
            <IconDelete fill={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {dataAddress(item?.item)?.map((i: any, idx: number) => (
        <Text key={idx} style={{ color: hexToRgba(Colors.black, 0.7) }}>
          {i?.title}: <Text style={[styleGlobal.textBold, styleGlobal.textFontBold]}>{i?.item}</Text>
        </Text>
      ))}
    </TouchableOpacity>
  );
};

export default React.memo(ItemMenu);

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginBottom: 10,
  },
  viewHeader: {
    marginBottom: 8,
  },
  viewTextCode: {
    color: hexToRgba(Colors.black, 0.4),
  },
  viewAddressDefault: {
    // backgroundColor: hexToRgba(Colors.primary, 0.2),
    borderRadius: 6,
    paddingHorizontal: 8,
  },
});
