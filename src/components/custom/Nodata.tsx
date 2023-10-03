import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';
import { useTranslation } from 'react-i18next';

interface IProps {
  query?: string;
}

const Nodata: React.FC<IProps> = ({ query }) => {
  const { t } = useTranslation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styleGlobal.dFlex_center, styleGlobal.flex_1]}>
        <View>
          <Text style={[styleGlobal.textPrimary]}>{t('Không tìm thấy sản phẩm có kết quả')}:</Text>
          <Text style={[styleGlobal.textFontBold, { textAlign: 'center' }]}>{query}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Nodata;

const styles = StyleSheet.create({});
