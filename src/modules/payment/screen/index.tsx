import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import useGetPayment from 'hooks/useGetPayment';
import { ActivityPenal, ButtonCustom, HeaderNew } from 'components';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import LinearGradient from 'react-native-linear-gradient';
import { formatCurrency, hexToRgba } from 'utils';
import { IconLocation } from 'assets/icons';
import { useTranslation } from 'react-i18next';
import useGetAddress from 'hooks/useGetAddress';
import { IPayments } from 'types/cart-types';
import { menuSub, renderAddress } from './const';

const ScreenPayments = () => {
  const { t } = useTranslation();
  const { payments } = useGetPayment();
  const { address } = useGetAddress();
  const [totalmeney, setTotalMonney] = React.useState<number>(0);
  const [shipping, setShipping] = React.useState<number>(0);

  React.useEffect(() => {
    const result: number = payments.reduce((tol: number, curr: IPayments) => {
      return (tol += Number(curr?.price) * Number(curr?.qty));
    }, shipping);
    setTotalMonney(result);
  }, [payments]);

  return (
    <ActivityPenal renderHeader={<HeaderNew title="Thanh toán" hiddenSearch />}>
      <View style={[styles.container, styleGlobal.flex_1]}>
        <ScrollView>
          <View style={[styleGlobal.padding_10]}>
            <View style={[styleGlobal.border, styleGlobal.boxshadow, styles.ViewAddress]}>
              <LinearGradient
                colors={[
                  hexToRgba(Colors.primary, 0.6),
                  'transparent',
                  hexToRgba(Colors.primary, 0.6),
                  'transparent',
                  hexToRgba(Colors.primary, 0.6),
                  'transparent',
                  hexToRgba(Colors.primary, 0.6),
                  'transparent',
                  hexToRgba(Colors.primary, 0.6),
                  'transparent',
                  hexToRgba(Colors.primary, 0.6),
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.viewLinearGradient}
              />

              <View style={[styleGlobal.padding_6, styles.ViewDetailAddress]}>
                <View style={[styleGlobal.dflex_spaceBetween]}>
                  <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart]}>
                    <IconLocation fill={Colors.primary} width={18} height={18} />
                    <Text style={[styleGlobal.textFontBold, styleGlobal.paddingHorizontal_4]}>
                      {t('Địa chỉ của tôi')}
                    </Text>
                  </View>

                  <ButtonCustom text="Chọn địa chỉ khác" styleButton={styles.ViewButtonAddress} />
                </View>

                <View style={[styleGlobal.marginTop_4]}>
                  {renderAddress(address)?.map((i: menuSub, idx: number) => (
                    <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart]} key={idx}>
                      <Text>{t(i?.title)}</Text>
                      <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart]}>
                        <Text style={[styleGlobal.textFontBold_400]}>{i?.content}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[styleGlobal.padding_10, styleGlobal.dflex_spaceBetween, styleGlobal.gap_18]}>
          <View style={styleGlobal.flex_3}>
            <View style={styleGlobal.dflex_spaceBetween}>
              <Text style={[styleGlobal.textFontBold]}>{t('Tổng tiền:')}</Text>
              <Text style={[styleGlobal.textFontBold, { color: Colors.primary }]} numberOfLines={1}>
                {formatCurrency(totalmeney, ' vnđ')}
              </Text>
            </View>
          </View>
          <ButtonCustom text="Đặt hàng" styleButton={styleGlobal.flex_1} />
        </View>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(ScreenPayments);

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
  viewLinearGradient: { width: '100%', height: 2 },
  ViewAddress: {
    borderColor: hexToRgba(Colors.black, 0.2),
  },
  ViewDetailAddress: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  ViewButtonAddress: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});
