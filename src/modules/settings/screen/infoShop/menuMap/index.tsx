/* eslint-disable react/self-closing-comp */
import { IconLocation } from 'assets/icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';

const locationID = { latitude: 20.810481228782997, longitude: 106.32251555810518 };

const MenuMap = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styleGlobal.dFlex_center, styleGlobal.justifyContent_flexStart, styles.viewInfo]}>
        <IconLocation fill={Colors.primary} />
        <Text style={[styleGlobal.textFontBold, styleGlobal.textFontSize_14]}>Quảng Nghiệp - Tứ Kỳ - Hải Dương.</Text>
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
  viewMap: { borderRadius: 10, height: '58%' },
  viewInfo: {},
});
