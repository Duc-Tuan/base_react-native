import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';
import { IconPackOrderEmty } from 'assets/icons';
import Colors from 'themes/Color';
import { useTranslation } from 'react-i18next';

interface IProp {
  text?: string;
}

const Emty: React.FC<IProp> = ({ text }) => {
  const { t } = useTranslation();
  return (
    <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column, styles.container]}>
      <IconPackOrderEmty fill={Colors.primary} width={100} height={100} />
      <Text
        style={[
          styleGlobal.marginBottom_10,
          styleGlobal.marginTop_10,
          styleGlobal.textFontSize_16,
          { padding: 20, textAlign: 'center' },
        ]}>
        {t(
          text ??
            'Hiện không có sản phẩm nào để tạo đơn hàng. Vui lòng chọn sản phẩm trong giỏ hàng để có thể tiếp tục đặt hàng.',
        )}
      </Text>
    </View>
  );
};

export default Emty;

const styles = StyleSheet.create({ container: { flex: 1 } });
