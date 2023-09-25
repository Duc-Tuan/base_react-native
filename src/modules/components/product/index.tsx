import { IconAddCart, IconHeart, IconHeartBorder } from 'assets/icons';
import { ImageCustom } from 'components';
import { useAppDispatch } from 'hooks';
import useGetHeart from 'hooks/useGetHeart';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal, widthFull } from 'types/StyleGlobal';
import { IProduct } from 'types/product-types';
import { formatCurrency, hexToRgba } from 'utils';
import { actions as actionsHeart } from 'modules/heart/store';

interface IProps {
  data: IProduct;
}

const ProductItem: React.FC<IProps> = ({ data }) => {
  const { dataHearts } = useGetHeart();
  const [isHeart, setIsHeart] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleAddCart = React.useCallback(() => {
    console.log(data?._id);
  }, []);

  React.useEffect(() => {
    const isCheck = dataHearts?.some((i: string) => i.toString() === data?._id.toString());
    setIsHeart(isCheck);
  }, [dataHearts]);

  const handleHeart = React.useCallback(() => {
    dispatch(actionsHeart.postHearts({ id: data?._id }));
  }, []);

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
      <TouchableOpacity
        onPress={handleHeart}
        activeOpacity={0.9}
        style={[
          styleGlobal.padding_4,
          styleGlobal.boxshadow,
          styles.ViewHeart,
          { backgroundColor: Colors.white, borderRadius: 50, shadowColor: Colors.black },
        ]}>
        {isHeart ? <IconHeart fill={Colors.primary} /> : <IconHeartBorder fill={Colors.primary} />}
      </TouchableOpacity>

      <View style={styles.viewImage}>
        <ImageCustom urlImeg={data?.productImage} styleWapper={styles.image} />
      </View>

      <View style={[styleGlobal.marginTop_8, { width: '100%' }]}>
        <Text
          numberOfLines={2}
          style={[styleGlobal.textFontBold, styleGlobal.paddingHorizontal_4, { textAlign: 'center' }]}>
          {data?.productName}
        </Text>

        <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingHorizontal_4]}>
          <View>
            <Text
              style={{ color: Colors.primary, textDecorationLine: data?.productPromotion ? 'line-through' : 'none' }}>
              {formatCurrency(data?.productPrice ?? 0, ' vnđ')}
            </Text>
            {data?.productPromotion && (
              <Text style={{ color: Colors.primary, textDecorationLine: 'line-through' }}>
                {formatCurrency(
                  Number(data?.productPrice) - Number(data?.productPrice) / (Number(data?.productPromotion) / 100) ?? 0,
                  ' vnđ',
                )}
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAddCart}
            style={[
              styleGlobal.padding_4,
              styleGlobal.dFlex_center,
              { backgroundColor: hexToRgba(Colors.primary, 0.2), borderRadius: 50 },
            ]}>
            <IconAddCart fill={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  container: { width: widthFull / 2 - 16, backgroundColor: Colors.white, borderRadius: 10, position: 'relative' },
  viewImage: { width: 140, height: 140 },
  image: { borderRadius: 8, objectFit: 'fill' },
  ViewHeart: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
  },
});
