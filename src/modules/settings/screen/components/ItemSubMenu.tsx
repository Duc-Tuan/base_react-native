import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import Colors from 'themes/Color';
import NavigationService from 'naviagtion/stack/NavigationService';
import { widthFull } from 'types/StyleGlobal';

interface IProps {
  item?: {
    tilte: string;
    screen: string;
    icon: JSX.Element;
    option?: object;
  };
  stylesWrapper?: ViewStyle;
}

const ItemSubMenu: React.FC<IProps> = ({ item, stylesWrapper }) => {
  const goToScreen = React.useCallback(() => {
    if (item?.screen) {
      NavigationService.navigate(item?.screen, item?.option || {});
    }
  }, [item]);

  return (
    <TouchableOpacity onPress={goToScreen} style={[styles.container, stylesWrapper]} activeOpacity={0.9}>
      {item?.icon}
      <Text style={styles.textTitle}>{item?.tilte}</Text>
    </TouchableOpacity>
  );
};

export default ItemSubMenu;

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
  textTitle: { color: Colors.textColor, fontSize: 14, fontWeight: '500', marginTop: 5 },
});
