/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useBoolean } from 'hooks/useBoolean';
import { IconCheck } from 'assets/icons';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';
import { hexToRgba } from 'utils';

interface IProps {
  textRight?: string;
  isDistable?: boolean;
  size?: number;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const CheckBox: React.FC<IProps> = ({ textRight, isDistable = true, size = 18, value, onChange }) => {
  const [isChecked, { on, off, toggle }] = useBoolean(value);

  const styleViewCheckBox = {
    backgroundColor: isChecked ? Colors.primary : 'transparent',
    borderColor: isChecked ? Colors.primary : hexToRgba(Colors.black, 0.6),
  };

  React.useEffect(() => {
    onChange && onChange(isChecked);
  }, [isChecked]);

  React.useEffect(() => {
    value ? on() : off();
  }, [value]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => isDistable && toggle()}>
      <View style={[styleGlobal.flexDirection_row, styleGlobal.gap_10, styles.container]}>
        <View
          style={[
            styleGlobal.dFlex_center,
            styleGlobal.border,
            styles.viewCheckBox,
            {
              width: size,
              height: size,
              ...styleViewCheckBox,
            },
          ]}>
          {isChecked && <IconCheck fill={Colors.white} />}
        </View>
        <Text style={styles.viewText}>{textRight}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  viewCheckBox: { borderRadius: 3, borderWidth: 2, padding: 6 },
  viewText: { color: Colors.black, fontWeight: '400' },
});
