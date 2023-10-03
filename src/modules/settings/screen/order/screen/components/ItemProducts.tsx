import { StyleSheet, Text, View, TextStyle } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';
import { formatCurrency, hexToRgba } from 'utils';
import Colors from 'themes/Color';
import { IOrderContent } from '../status/const';
import { ImageCustom } from 'components';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: any;
}

const ItemProducts: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();

  const styleText: TextStyle = {
    color: Colors.primary,
  };

  return (
    <View
      style={[
        styleGlobal.marginTop_10,
        styles.ViewDetailAddress,
        styleGlobal.borderBottomPrimary,
        {
          borderRadius: 4,
          backgroundColor: hexToRgba(Colors.white, 0.6),
          borderBottomColor: hexToRgba(Colors.black, 0.1),
        },
      ]}>
      <View
        style={[
          styleGlobal.dflex_spaceBetween,
          styleGlobal.paddingBottom_8,
          styleGlobal.borderBottomPrimary,
          { borderBottomColor: hexToRgba(Colors.black, 0.1) },
        ]}>
        <Text style={[styleGlobal.flex_3, styleGlobal.textFontBold_400]}>{t('Sản phẩm')}</Text>
        <Text style={[styleGlobal.flex_1, styleGlobal.textFontBold_400, { textAlign: 'right' }]}>{t('Số lượng')}</Text>
        <Text style={[styleGlobal.flex_2, styleGlobal.textFontBold_400, { textAlign: 'right' }]}>{t('Giá (vnđ)')}</Text>
      </View>

      <View style={[styleGlobal.paddingTop_8]}>
        {data?.map((i: IOrderContent, idx: number) => {
          const priceAfterPrommotion: number = Number(i?.price) - Number(i?.price) * (Number(i?.promotion) / 100);
          return (
            <View
              style={[
                styleGlobal.dflex_spaceBetween,
                idx === data?.orderContent?.length - 1 ? undefined : styleGlobal.paddingBottom_8,
              ]}
              key={idx}>
              <View style={[styleGlobal.flex_3, { overflow: 'hidden' }]}>
                <View
                  style={[
                    styleGlobal.dFlex_center,
                    styleGlobal.alignItems_flexStart,
                    styleGlobal.justifyContent_flexStart,
                    styleGlobal.gap_10,
                  ]}>
                  <ImageCustom urlImeg={i?.image} styleWapper={styles.viewImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styleGlobal.textFontBold_400]} numberOfLines={2}>
                      {i?.name}
                    </Text>
                    <Text
                      style={[
                        {
                          ...styleText,
                          fontSize: i?.promotion ? 12 : 13,
                          textDecorationLine: i?.promotion ? 'line-through' : 'none',
                        },
                      ]}>
                      {formatCurrency(i?.price, ' vnđ')}
                    </Text>
                    {i?.promotion && (
                      <Text style={{ ...styleText }}>{formatCurrency(priceAfterPrommotion ?? 0, ' vnđ')}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={[styleGlobal.flex_1]}>
                <Text style={[styleGlobal.textFontBold, { ...styleText, textAlign: 'right' }]}>{i?.qty}</Text>
              </View>
              <View style={[styleGlobal.flex_2, { overflow: 'hidden' }]}>
                <Text
                  style={[
                    styleGlobal.textFontBold_400,
                    {
                      textAlign: 'right',
                      ...styleText,
                      fontWeight: i?.promotion ? '400' : '700',
                      textDecorationLine: i?.promotion ? 'line-through' : 'none',
                      fontSize: i?.promotion ? 12 : 14,
                    },
                  ]}
                  numberOfLines={1}>
                  {formatCurrency(i?.price * i?.qty, ' vnđ')}
                </Text>
                {i?.promotion && (
                  <Text style={{ ...styleText, textAlign: 'right', fontWeight: '700' }}>
                    {formatCurrency(priceAfterPrommotion * i?.qty ?? 0, ' vnđ')}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ItemProducts;

const styles = StyleSheet.create({
  ViewDetailAddress: {
    width: '100%',
  },
  viewImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
});
