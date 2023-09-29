import { IOptions } from 'types/product-types';
import { formatCurrency } from 'utils';
import { checkNullish } from 'utils/genal';
import { Text, View } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';

export const BANNER_H = 350;
export const TOPNAVI_H = 350;

export const renderItem: (data: any) => any[] = (data: any) => {
  const priceAfterPrommotion: number = Math.abs(
    Number(data?.productPrice) - Number(data?.productPrice) * (Number(data?.productPromotion) / 100),
  );
  return [
    {
      value: 'Khuyến mãi: ',
      label: (
        <Text style={[styleGlobal.textFontBold_400, { textAlign: 'left' }]} numberOfLines={1}>
          {checkNullish(data?.productPromotion) ? `${checkNullish(data?.productPromotion)}%` : '---'}
        </Text>
      ),
    },
    {
      value: 'Đơn vị: ',
      label: (
        <Text style={[styleGlobal.textFontBold_400, { textAlign: 'left' }]} numberOfLines={1}>
          {checkNullish(data?.productUnit) ?? '---'}
        </Text>
      ),
    },
    {
      value: 'Thể loại: ',
      label: (
        <Text style={[styleGlobal.textFontBold_400, { textAlign: 'left' }]} numberOfLines={1}>
          {checkNullish(data?.productCategory) ?? '---'}
        </Text>
      ),
    },
    {
      value: 'Giá: ',
      label:
        (
          <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart, styleGlobal.gap_10]}>
            <Text
              style={[
                {
                  color: Colors.primary,
                  fontWeight: data?.productPromotion ? '400' : '700',
                  fontSize: data?.productPromotion ? 13 : 16,
                  textDecorationLine: data?.productPromotion ? 'line-through' : 'none',
                },
              ]}>
              {formatCurrency(data?.productPrice, ' vnđ')}
            </Text>

            {data?.productPromotion && (
              <>
                <Text>-</Text>
                <Text style={{ color: Colors.primary, fontWeight: '700', fontSize: 16 }}>
                  {formatCurrency(priceAfterPrommotion ?? 0, ' vnđ')}
                </Text>
              </>
            )}
          </View>
        ) ?? '---',
    },
    {
      value: 'Nhà sx: ',
      label: (
        <Text style={[styleGlobal.textFontBold_400, { textAlign: 'left' }]} numberOfLines={1}>
          {checkNullish(data?.productSource) ?? '---'}
        </Text>
      ),
    },
    {
      value: 'Mô tả ngắn: ',
      label: (
        <View style={[styleGlobal.border, { borderRadius: 4, width: '100%', padding: 4, minHeight: 120 }]}>
          <Text>{checkNullish(data?.productDesc) ?? '---'}</Text>
        </View>
      ),
    },
  ];
};
