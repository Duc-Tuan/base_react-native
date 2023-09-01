/* eslint-disable react-native/no-inline-styles */
import { IconClose } from 'assets/icons';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import ButtonCustom from './custom/ButtonCustom';
import { useTranslation } from 'react-i18next';

interface Props {
  isVisible: boolean;
  hiddenPopup?: () => void;
  textHeader?: string;
  swipeDirection?: 'left' | 'right' | 'up' | 'down';
  isHeader?: boolean;
  isFooter?: boolean;
  footer?: React.ReactNode[];
  children: JSX.Element;
}

const WrapperModal = (props: Props) => {
  const {
    isVisible,
    hiddenPopup,
    textHeader,
    isHeader = true,
    isFooter = false,
    footer,
    children,
    swipeDirection = 'down',
  } = props;
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={isVisible}
      style={[styles.container]}
      onBackdropPress={hiddenPopup}
      swipeDirection={swipeDirection}>
      <View style={styles.popup}>
        {isHeader && (
          <View
            style={[
              styleGlobal.flexDirection_row,
              styleGlobal.justifyContent_spaceBetween,
              styleGlobal.alignItems_center,
              styles.header,
            ]}>
            <Text style={styles.textHeader} numberOfLines={1}>
              {t(textHeader ?? 'Đang cập nhập...')}
            </Text>
            <TouchableOpacity activeOpacity={0.9} onPress={hiddenPopup}>
              <IconClose fill={Colors.black} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.textChildren}>{children}</View>

        {isFooter && (
          <View
            style={[
              styleGlobal.flexDirection_row,
              styleGlobal.justifyContent_flexEnd,
              styleGlobal.alignItems_center,
              styleGlobal.gap_10,
              styles.footer,
            ]}>
            {footer &&
              footer?.map((item: React.ReactNode, idx: number) => <React.Fragment key={idx}>{item}</React.Fragment>)}
            <ButtonCustom text="Đóng" typeButton="outline-main" styleButton={{ width: 70 }} action={hiddenPopup} />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default WrapperModal;

const styles = StyleSheet.create({
  container: {},
  header: {},
  footer: { gap: 10 },
  textHeader: { color: Colors.black },
  textChildren: {},
  popup: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
});
