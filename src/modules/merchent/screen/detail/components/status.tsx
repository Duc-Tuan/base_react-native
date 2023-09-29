import { Text, View, StyleSheet } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

// ['STOCKING', 'OUT_OF_STOCK']
export const startProduct: (data?: string) => React.JSX.Element = (data?: string) => {
  switch (data) {
    case 'STOCKING':
      return (
        <View style={[styles.bg, styleGlobal.boxshadow, styleSub.bg('#00c39f')]}>
          <Text style={[styleGlobal.textFontBold, styles.ViewText]}>Còn hàng</Text>
        </View>
      );
    case 'OUT_OF_STOCK':
      return (
        <View style={[styles.bg, styleGlobal.boxshadow, styleSub.bg('#C2185B')]}>
          <Text style={[styleGlobal.textFontBold, styles.ViewText]}>Đã hết hàng</Text>
        </View>
      );
    default:
      return (
        <View style={[styles.bg, styleGlobal.boxshadow, styleSub.bg('#C2185B')]}>
          <Text style={[styleGlobal.textFontBold, styles.ViewText]}>Đang cập nhật</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  bg: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    width: 120,
  },
  ViewText: {
    color: Colors.white,
    textAlign: 'center',
  },
});

const styleSub = {
  bg: (color: string) => ({
    backgroundColor: hexToRgba(color, 1),
  }),
};
