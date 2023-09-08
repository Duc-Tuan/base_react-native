import { ImageCustom } from 'components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal, widthFull } from 'types/StyleGlobal';

interface IProps {
  data: any;
}

const ProductItem: React.FC<IProps> = ({ data }) => {
  return (
    <View
      style={[
        styleGlobal.justifyContent_center,
        styleGlobal.flexDirection_column,
        styleGlobal.alignItems_center,
        styleGlobal.boxshadow,
        styleGlobal.padding_6,
        styleGlobal.paddingVertical_10,
        styles.container,
      ]}>
      <View style={styles.viewImage}>
        <ImageCustom urlImeg={data?.productImage} styleWapper={styles.image} />
      </View>
      <Text style={styleGlobal.textFontBold}>{data?.productName}</Text>
    </View>
  );
};

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  container: { width: widthFull / 2 - 16, backgroundColor: Colors.white, borderRadius: 10 },
  viewImage: { width: 140, height: 140 },
  image: { borderRadius: 8, objectFit: 'fill' },
});
