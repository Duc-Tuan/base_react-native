/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import ApiAddressOrder from 'assets/api/ApiAddress';
import { ILocation } from 'assets/data';
import { IconDelete } from 'assets/icons';
import { ButtonCustom, WrapperModal } from 'components';
import { PathName } from 'configs';
import { useBoolean } from 'hooks/useBoolean';
import { useToast } from 'hooks/useToast';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

interface IProps {
  item?: ILocation;
  handleDeleteUi?: () => void;
}

const ItemMenu: React.FC<IProps> = ({ item, handleDeleteUi }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isPopUp, { on, off, toggle }] = useBoolean();
  const [loading, setLoading] = React.useState<boolean>(false);

  const dataAddress = (data?: ILocation) => {
    return [
      { title: t('Cơ quan'), item: data?.addressOrganReceive },
      { title: t('Số điện thoại'), item: data?.addressPhoneReceive },
      { title: t('Thời gian nhận hàng'), item: data?.addressTimeReceive },
      { title: t('Địa chỉ'), item: data?.addressDetail },
    ];
  };

  const handleDelete = React.useCallback(async (id?: any) => {
    setLoading(true);
    const dataDelete = await ApiAddressOrder.deleteAddressOrder(id);
    if (dataDelete?.status) {
      handleDeleteUi && handleDeleteUi();
      off();
    }
    setLoading(false);
    toast(dataDelete?.status, dataDelete?.mess);
  }, []);

  const goToScreen = React.useCallback(() => {
    NavigationService.navigate(PathName.NEWANDEDITADDRESSSCREEN, item || {});
  }, [item]);

  const hiddenPopup = React.useCallback(() => off(), []);

  const footer = React.useCallback(
    () => [
      <ButtonCustom
        text="Xóa"
        action={() => handleDelete(item?._id)}
        disabled={loading}
        typeButton={!loading ? 'main' : 'disabled'}
      />,
    ],
    [item?._id, loading],
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => goToScreen()}
        style={[styleGlobal.padding_10, styleGlobal.boxshadow, styleGlobal.border, styles.container]}>
        <View style={[styleGlobal.dflex_spaceBetween, styles.viewHeader]}>
          <View style={[styleGlobal.dFlex_center, styleGlobal.gap_6]}>
            <Text style={styles.viewTextCode}>{item?.code}</Text>
            {item?.addressDefault && (
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

          {!item?.addressDefault && (
            <TouchableOpacity
              onPress={() => toggle()}
              style={[
                styleGlobal.buttonActionsCirc,
                styleGlobal.padding_6,
                { backgroundColor: hexToRgba(Colors.primary, 0.1) },
              ]}
              activeOpacity={0.8}>
              <IconDelete fill={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {dataAddress(item)?.map((i: any, idx: number) => (
          <Text key={idx} style={{ color: hexToRgba(Colors.black, 0.7) }}>
            {i?.title}: <Text style={[styleGlobal.textBold, styleGlobal.textFontBold]}>{i?.item}</Text>
          </Text>
        ))}
      </TouchableOpacity>

      {isPopUp && (
        <WrapperModal
          isVisible={isPopUp}
          isClose={false}
          hiddenPopup={hiddenPopup}
          textHeader={`Xóa thông tin địa chỉ ${item?.code ?? 'Đang cập nhật...'}`}
          isFooter
          textFooter="Hủy"
          loading={loading}
          footer={footer}>
          <Text
            style={[
              styleGlobal.padding_10,
              styleGlobal.paddingVertical_16,
              styleGlobal.textPrimary,
              styles.viewTextNotifi,
            ]}>
            {t('Thao tác này không thể lấy lại được thông tin khi đã xóa. Bạn có muốn xóa thông tin này!!!')}
          </Text>
        </WrapperModal>
      )}
    </>
  );
};

export default React.memo(ItemMenu);

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderColor: hexToRgba(Colors.black, 0.2),
    // marginBottom: 10,
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
  viewTextNotifi: {},
});
