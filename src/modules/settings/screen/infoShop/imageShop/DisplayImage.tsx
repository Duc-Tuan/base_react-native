import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';

const DisplayImage = () => {
  const handleBack = () => {};
  const { t } = useTranslation();

  return (
    <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column, styleGlobal.marginTop_14]}>
      <TouchableOpacity onPress={handleBack} style={[styles.viewBack]} activeOpacity={1}>
        <View style={[styleGlobal.padding_2, styles.viewImgShop, { borderColor: Colors.primary }]}>
          <Image
            source={require('assets/images/avt.jpg')}
            style={[styleGlobal.image, styleGlobal.padding_10, styles.viewImageShop]}
          />
        </View>
      </TouchableOpacity>
      <Text style={[styleGlobal.textFontBold, styleGlobal.marginTop_10]}>{t('Cửa hàng')} Chef</Text>
      <View style={[styleGlobal.dFlex_center, styleGlobal.gap_18, styleGlobal.paddingTop_10]}>
        <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column]}>
          <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_16, styleGlobal.textBg]}>10</Text>
          <Text style={[styleGlobal.textPrimary]}>{t('Lượt thích')}</Text>
        </View>
        <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column]}>
          <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_16, styleGlobal.textBg]}>10</Text>
          <Text style={[styleGlobal.textPrimary]}>{t('Theo dõi')}</Text>
        </View>
        <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column]}>
          <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_16, styleGlobal.textBg]}>10</Text>
          <Text style={[styleGlobal.textPrimary]}>{t('Phản hồi')}</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(DisplayImage);

const styles = StyleSheet.create({
  viewBack: { justifyContent: 'center' },
  viewImgShop: { borderRadius: 100, borderWidth: 1, borderStyle: 'solid' },
  viewImageShop: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  viewGroup: {},
});
