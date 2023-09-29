import LinearGradientCustom from 'components/custom/LinearGradientCustom';
import { PATHNAME } from 'configs/PathName/PathName';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { styleGlobal, widthFull } from 'types/StyleGlobal';

interface IProps {
  data: any;
}

const CategoryItem: React.FC<IProps> = ({ data }) => {
  const handleProducts = React.useCallback((i: any) => {
    return NavigationService.navigate(PATHNAME.MERCHENTSCREEN, {
      idCategory: i?._id,
      nameCategory: i?.categoryName,
    });
  }, []);

  return (
    <View
      style={[
        styleGlobal.dFlex_center,
        styleGlobal.gap_10,
        styleGlobal.flex_wrap,
        {
          width: widthFull - 20,
        },
      ]}>
      {data?.map((i: any, idx: number) => (
        <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => handleProducts(i)}>
          <LinearGradientCustom>
            <View
              key={idx}
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
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default React.memo(CategoryItem);

const styles = StyleSheet.create({
  container: { width: widthFull / 4 },
  viewImage: { width: 50, height: 50 },
});
