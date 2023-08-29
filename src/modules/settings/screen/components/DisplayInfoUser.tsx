import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';
import { ButtonCustom } from 'components';
import { useTranslation } from 'react-i18next';

interface IProps {
  colorPrimary?: string;
}

const DisplayInfoUser: React.FC<IProps> = ({ colorPrimary }) => {
  const { t } = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={() => console.log('info user...')}>
      <View style={[styleGlobal.padding_10, styleGlobal.boxshadow, styles.container]}>
        <View style={[styleGlobal.flexDirection_row, styleGlobal.gap_10]}>
          <View style={[styleGlobal.border, styleGlobal.padding_2, styles.viewImage, { borderColor: colorPrimary }]}>
            <Image source={require('assets/images/avt.jpg')} style={[styleGlobal.image, styles.viewImg]} />
          </View>

          <View>
            <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold]}>Pham Duc Tuan</Text>
            <ButtonCustom text="Đăng xuất" styleButton={styles.viewLogout} />
          </View>
        </View>

        <View
          style={[
            styleGlobal.padding_6,
            styles.viewSub,
            { backgroundColor: hexToRgba(colorPrimary ?? Colors.primary, 0.05) },
          ]}>
          <Text style={[styleGlobal.textPrimary]}>{t('Giới tính')}: Nam</Text>
          <Text style={[styleGlobal.textPrimary]}>{t('Năm sinh')}: 26/03/2002</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(DisplayInfoUser);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  viewImage: {
    // borderColor: Colors.primary,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
  },
  viewImg: {
    borderRadius: 100,
  },
  viewSub: {
    // backgroundColor: hexToRgba(Colors.primary, 0.05),
    marginTop: 10,
    borderRadius: 4,
  },
  viewLogout: {
    padding: 2,
    marginTop: 6,
  },
});
