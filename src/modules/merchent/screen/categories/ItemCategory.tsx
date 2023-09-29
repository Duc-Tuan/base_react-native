import { ImageCustom } from 'components';
import { PATHNAME } from 'configs/PathName/PathName';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal, widthFull } from 'types/StyleGlobal';
import { ICategory } from 'types/category-types';

interface IProps {
  data: ICategory;
}

const ItemCategory: React.FC<IProps> = ({ data }) => {
  const handleProducts = React.useCallback(() => {
    return NavigationService.navigate(PATHNAME.MERCHENTSCREEN, {
      idCategory: data?._id,
      nameCategory: data?.categoryName,
    });
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleProducts}
      style={[
        styleGlobal.justifyContent_spaceBetween,
        styleGlobal.alignItems_center,
        styleGlobal.padding_10,
        styleGlobal.border,
        styleGlobal.boxshadow,
        styles.container,
      ]}>
      <View style={[styleGlobal.flex_1, styleGlobal.dFlex_center]}>
        <ImageCustom urlImeg={data?.categoryImage} styleWapper={[styles.viewImage]} />
      </View>
      <Text numberOfLines={1} style={[styleGlobal.textFontBold]}>
        {data?.categoryName}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemCategory;

const styles = StyleSheet.create({
  container: {
    width: widthFull / 2 - 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 140,
  },
  viewImage: { width: 80, height: 80 },
});
