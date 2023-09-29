import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';
import { checkNullish } from 'utils/genal';
import { hexToRgba } from 'utils';
import Colors from 'themes/Color';

interface IProps {
  data?: string;
}

const DescDetail: React.FC<IProps> = ({ data }) => {
  return (
    <View style={[styleGlobal.border, styles.ViewMinHeight, styleGlobal.padding_4]}>
      <Text style={[styleGlobal.textPrimary]}>{checkNullish(data) ?? '---'}</Text>
    </View>
  );
};

export default DescDetail;

const styles = StyleSheet.create({
  ViewMinHeight: {
    minHeight: 260,
    backgroundColor: hexToRgba(Colors.black, 0.05),
    borderRadius: 4,
    borderColor: hexToRgba(Colors.black, 0.2),
  },
});
