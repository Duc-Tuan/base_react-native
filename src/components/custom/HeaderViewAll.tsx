import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';
import NavigationService from 'naviagtion/stack/NavigationService';
import { useTranslation } from 'react-i18next';
import { IconRightV2 } from 'assets/icons';
import Colors from 'themes/Color';

interface IProps {
  title: string;
  namePath: string;
}

const HeaderViewAll: React.FC<IProps> = ({ title, namePath }) => {
  const { t } = useTranslation();
  const handleViewAll = React.useCallback(() => {
    NavigationService.navigate(namePath);
  }, [namePath]);

  return (
    <View
      style={[
        styleGlobal.backgroundColorWhite,
        styleGlobal.dflex_spaceBetween,
        styleGlobal.padding_10,
        styleGlobal.marginBottom_10,
        styles.container,
      ]}>
      <Text style={[styleGlobal.textFontBold]}>{t(title)}</Text>

      <TouchableOpacity activeOpacity={0.9} onPress={handleViewAll}>
        <View style={[styleGlobal.dFlex_center, styleGlobal.gap_4]}>
          <Text style={[styleGlobal.textBg, { color: Colors.primary }]}>{t('Xem tất cả')}</Text>
          <IconRightV2 fill={Colors.primary} width={16} height={16} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(HeaderViewAll);

const styles = StyleSheet.create({
  container: { borderRadius: 6 },
});
