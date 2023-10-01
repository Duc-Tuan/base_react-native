import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TabsMenu from 'components/custom/TabsMenu';
import { useTranslation } from 'react-i18next';
import Comments from './components/comments/Comments';
import DescDetail from './components/DescDetail';
import { styleGlobal } from 'types/StyleGlobal';
import { checkNullish } from 'utils/genal';

interface IProps {
  id?: string | number;
  data?: string;
}

const DescAndComments: React.FC<IProps> = ({ id, data }) => {
  const { t } = useTranslation();

  return (
    <View style={[styleGlobal.marginTop_10]}>
      <View>
        <Text style={[styleGlobal.textFontBold_400, styleGlobal.paddingBottom_8]}>{t('Mô tả chi tiết:')}</Text>
        <View style={[styleGlobal.flex_2, { width: '100%' }]}>
          <DescDetail data={data} />
        </View>
      </View>
    </View>
  );
};

export default DescAndComments;

const styles = StyleSheet.create({});
