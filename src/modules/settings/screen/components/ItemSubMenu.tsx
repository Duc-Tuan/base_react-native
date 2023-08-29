import { StyleSheet, Text, TouchableOpacity, ViewStyle, View } from 'react-native';
import React from 'react';
import Colors from 'themes/Color';
import NavigationService from 'naviagtion/stack/NavigationService';
import { styleGlobal, widthFull } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

interface IProps {
  item?: {
    tilte: string;
    screen: string;
    icon: JSX.Element;
    option?: object;
    isLogin?: boolean;
  };
  stylesWrapper?: ViewStyle;
}

const ItemSubMenu: React.FC<IProps> = ({ item, stylesWrapper }) => {
  const goToScreen = React.useCallback(() => {
    if (item?.screen) {
      NavigationService.navigate(item?.screen, item?.option || {});
    }
  }, [item]);

  return item?.isLogin || item?.isLogin === undefined ? (
    <TouchableOpacity onPress={goToScreen} style={[styles.container, stylesWrapper]} activeOpacity={0.9}>
      {item?.icon}
      <Text style={styles.textTitle}>{item?.tilte}</Text>
    </TouchableOpacity>
  ) : (
    <View style={[styles.container, styleGlobal.border, styles.containerNull, stylesWrapper]}>
      {item?.icon}
      <Text style={(styles.textTitle, item?.isLogin && styles.activeText)}>{item?.tilte}</Text>
    </View>
  );
};

export default React.memo(ItemSubMenu);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: (widthFull - 30) / 2,
    elevation: 2,
  },
  containerNull: {
    backgroundColor: hexToRgba(Colors.black, 0.1),
    borderColor: hexToRgba(Colors.black, 0.2),
    elevation: 0,
  },
  textTitle: { color: Colors.textColor, fontSize: 14, fontWeight: '500', marginTop: 5 },
  activeText: {
    color: hexToRgba(Colors.textColor, 0.6),
  },
});
