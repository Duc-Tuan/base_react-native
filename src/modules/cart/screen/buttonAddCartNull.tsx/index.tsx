import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';
import { hexToRgba } from 'utils';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import IconAddCartNull from 'assets/icons/icon_addCartNull';

const ButtonAddCartNull = () => {
  return (
    <ScrollView>
      <TouchableOpacity
        activeOpacity={1}
        style={styleGlobal.boxshadow}
        onPress={() => NavigationService.navigate(PathName.HOMESCREEN)}>
        <View style={[styleGlobal.dFlex_center, styleGlobal.gap_14, styleGlobal.padding_10, styles.viewNoData]}>
          <IconAddCartNull fill={Colors.primary} />
          <View>
            <Text>Giỏ hàng của bạn chưa có sản phẩm nào.</Text>
            <Text style={styles.viewText}>Thêm sản phẩm</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ButtonAddCartNull;
const styles = StyleSheet.create({
  viewNoData: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 16,
    borderStyle: 'dashed',
    borderColor: hexToRgba(Colors.primary, 0.6),
    borderWidth: 2,
  },
  viewText: {
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
    fontSize: 16,
  },
});
