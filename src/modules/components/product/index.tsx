import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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
        styleGlobal.padding_10,
        styles.container,
      ]}>
      <View style={styles.viewImage}>
        <Image
          style={[styleGlobal.image]}
          source={{
            uri: data?.productImage,
          }}
        />
      </View>
      <Text style={styleGlobal.textFontBold}>{data?.productName}</Text>
    </View>
  );
};

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  container: { width: widthFull / 2 - 16, backgroundColor: Colors.white, borderRadius: 10 },
  viewImage: { width: 100, height: 100 },
});
