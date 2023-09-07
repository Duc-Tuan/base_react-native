/* eslint-disable react/self-closing-comp */
import { IconLocation } from 'assets/icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { IMerChant } from '../type';
import { useTranslation } from 'react-i18next';

const locationID = { latitude: 20.810481228782997, longitude: 106.32251555810518 };

interface IProps {
  data?: IMerChant[];
}

const MenuMap: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  const [dataMerchant, setDataMerchant] = React.useState<IMerChant | undefined>(data && data[0]);

  React.useEffect(() => {
    setDataMerchant(data && data[0]);
  }, [data]);

  return (
    <View style={[styles.container]}>
      <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart, styles.viewInfo]}>
        <IconLocation fill={Colors.primary} />
        <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_14]}>
          {dataMerchant?.merchantAddress ?? t('Đang cập nhật...')}
        </Text>
      </View>

      <View style={[styleGlobal.flex_1, styleGlobal.paddingTop_10]}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styleGlobal.border, styleGlobal.image, styles.viewMap]}
          initialRegion={{
            ...locationID,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          <Marker
            coordinate={{
              ...locationID,
            }}
          />
        </MapView>
      </View>
    </View>
  );
};

export default React.memo(MenuMap);

const styles = StyleSheet.create({
  container: { paddingTop: 10, flex: 1 },
  viewMap: { borderRadius: 10, height: '66%' },
  viewInfo: {},
});
