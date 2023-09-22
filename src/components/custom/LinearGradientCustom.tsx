import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from 'themes/Color';
import { hexToRgba } from 'utils';

interface IProps {
  children: React.ReactElement;
}

const LinearGradientCustom: React.FC<IProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={[
        hexToRgba(Colors.primary, 0.6),
        'transparent',
        'transparent',
        'transparent',
        hexToRgba(Colors.primary, 0.6),
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.viewLinearGradient}>
      {children}
    </LinearGradient>
  );
};

export default LinearGradientCustom;

const styles = StyleSheet.create({ viewLinearGradient: { borderRadius: 6 } });
