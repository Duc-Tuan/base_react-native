/* eslint-disable react-native/no-inline-styles */
import { IconClose } from 'assets/icons';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
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
  footer?: () => React.ReactNode[];
  children: JSX.Element;
  isClose?: boolean;
  styleTextHeader?: StyleProp<TextStyle>;
  textFooter?: string;
  loading?: boolean;
}

const WrapperModal = (props: Props) => {
  const {
    isVisible,
    hiddenPopup,
    textHeader,
    isHeader = true,
    isFooter = false,
    isClose = true,
    footer,
    children,
    swipeDirection = 'down',
    styleTextHeader,
    textFooter = 'Đóng',
    loading,
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
              !isClose ? styleGlobal.justifyContent_center : styleGlobal.justifyContent_spaceBetween,
              styleGlobal.alignItems_center,
              styles.header,
            ]}>
            <Text style={[styles.textHeader, !isClose && styleGlobal.textCenter, styleTextHeader]} numberOfLines={1}>
              {t(textHeader ?? 'Đang cập nhập...')}
            </Text>
            {isClose && (
              <TouchableOpacity activeOpacity={0.9} onPress={hiddenPopup}>
                <IconClose fill={Colors.black} />
              </TouchableOpacity>
            )}
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
              footer()?.map((item: React.ReactNode, idx: number) => <React.Fragment key={idx}>{item}</React.Fragment>)}
            <ButtonCustom
              disabled={loading}
              typeButton={!loading ? 'outline-main' : 'disabled-outline'}
              text={textFooter}
              styleButton={{ width: 70 }}
              action={hiddenPopup}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default React.memo(WrapperModal);

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
