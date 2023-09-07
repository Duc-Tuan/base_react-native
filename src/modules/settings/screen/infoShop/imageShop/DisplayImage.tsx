import { ImageCustom } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { IMerChant } from '../type';

interface IProps {
  data?: IMerChant[];
}

const DisplayImage: React.FC<IProps> = ({ data }) => {
  const handleBack = () => {};
  const { t } = useTranslation();
  const [dataMerchant, setDataMerchant] = React.useState<IMerChant | undefined>(data && data[0]);

  const stylesText = {
    color: Colors.primary,
  };

  React.useEffect(() => {
    setDataMerchant(data && data[0]);
  }, [data]);

  return (
    <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column, styleGlobal.marginTop_14]}>
      <TouchableOpacity onPress={handleBack} style={[styles.viewBack]} activeOpacity={1}>
        <View style={[styleGlobal.padding_2, styles.viewImgShop, { borderColor: Colors.primary }]}>
          <ImageCustom urlImeg={dataMerchant?.merchantImage} styleWapper={styles.viewImageShop} />
        </View>
      </TouchableOpacity>
      <Text style={[styleGlobal.textFontBold, styleGlobal.marginTop_10]}>
        {t('Cửa hàng')} {dataMerchant?.merchantName ?? t('Đang cập nhật...')}
      </Text>
      <View style={[styleGlobal.dFlex_center, styleGlobal.gap_18, styleGlobal.paddingTop_10]}>
        <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column]}>
          <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_16, { ...stylesText }]}>
            {dataMerchant?.merchantLike ?? t('Đang cập nhật...')}
          </Text>
          <Text style={[styleGlobal.textPrimary]}>{t('Lượt thích')}</Text>
        </View>
        <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column]}>
          <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_16, { ...stylesText }]}>
            {dataMerchant?.merchantFollowing ?? t('Đang cập nhật...')}
          </Text>
          <Text style={[styleGlobal.textPrimary]}>{t('Theo dõi')}</Text>
        </View>
        <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column]}>
          <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_16, { ...stylesText }]}>
            {dataMerchant?.merchantFeedback ?? t('Đang cập nhật...')}
          </Text>
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
});
