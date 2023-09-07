import LinearGradientCustom from 'components/custom/LinearGradientCustom';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { styleGlobal, widthFull } from 'types/StyleGlobal';

interface IProps {
  data: any;
}

const CategoryItem: React.FC<IProps> = ({ data }) => {
  return (
    <View
      style={[
        styleGlobal.dFlex_center,
        styleGlobal.gap_10,
        styleGlobal.flex_wrap,
        // styleGlobal.justifyContent_flexStart,
        {
          width: widthFull - 20,
        },
      ]}>
      {data?.map((i: any, idx: number) => (
        <LinearGradientCustom key={idx}>
          <View
            style={[
              styleGlobal.justifyContent_center,
              styleGlobal.flexDirection_column,
              styleGlobal.alignItems_center,
              styleGlobal.padding_10,
              styles.container,
            ]}>
            <View style={styles.viewImage}>
              <Image
                style={[styleGlobal.image]}
                source={{
                  uri: i?.categoryImage,
                }}
              />
            </View>
            <Text numberOfLines={1} style={styleGlobal.textFontBold}>
              {i?.categoryName}
            </Text>
          </View>
        </LinearGradientCustom>
      ))}
    </View>
  );
};

export default React.memo(CategoryItem);

const styles = StyleSheet.create({
  container: { width: widthFull / 4 },
  viewImage: { width: 50, height: 50 },
});
