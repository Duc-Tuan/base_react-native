import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Colors from 'themes/Color';

type Props = {
  icon: any;
  buttonStyle?: ViewStyle;
  onPress?: () => void;
};

const ButtonIconCustom = (props: Props) => {
  const { icon, buttonStyle, onPress } = props;

  React.useEffect(() => {
    console.log('buttonIcon....');
  }, []);

  return (
    <TouchableOpacity activeOpacity={1} style={[styles.container, buttonStyle]} onPress={onPress}>
      <View style={[{ transform: [{ rotate: '-45deg' }] }]}>{icon}</View>
    </TouchableOpacity>
  );
};
export default React.memo(ButtonIconCustom);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
