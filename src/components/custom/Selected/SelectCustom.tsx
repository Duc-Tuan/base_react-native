/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconDown } from 'assets/icons';
import { useBoolean } from 'hooks/useBoolean';
import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, Animated, Platform } from 'react-native';
import { useClickOutside } from 'react-native-click-outside';
import Colors from 'themes/Color';
import { IOptions } from 'types/product-types';
import ItemSelect from './ItemSelect';
import { styleGlobal } from 'types/StyleGlobal';
import { useTranslation } from 'react-i18next';
import { hexToRgba } from 'utils';

interface IProps {
  styleWrapper?: StyleProp<ViewStyle>;
  options: IOptions[];
  placeholder?: string;
  label?: string;
  onChange?: (data: any) => void;
  required?: boolean;
}

const SelectCustom: React.FC<IProps> = ({ options, styleWrapper, placeholder, label, onChange, required }) => {
  const { t } = useTranslation();
  const [isMenu, { on, off, toggle }] = useBoolean();
  const animated = React.useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = React.useState<IOptions | undefined>();
  const hidden = React.useCallback(() => off(), [off]);

  const ref = useClickOutside<View>(hidden);

  const spin = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
    extrapolate: 'clamp',
  });

  React.useEffect(() => {
    onChange && onChange(selected?.label);
  }, [selected, onChange]);

  React.useEffect(() => {
    isMenu
      ? Animated.timing(animated, { toValue: 1, duration: 300, useNativeDriver: true }).start(() => {
          animated.setValue(1);
        })
      : Animated.timing(animated, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
          animated.setValue(0);
        });
  }, [isMenu, animated]);

  return (
    <View>
      {label && (
        <Text style={styles.viewTextLable}>
          {t(label)}
          {required && (
            <Text style={{ color: hexToRgba(Colors.black, 0.6) }}>
              (<Text style={styles.viewRequired}>*</Text>)
            </Text>
          )}
        </Text>
      )}
      <View style={[styleGlobal.border, styles.container, styleWrapper]} ref={ref}>
        <TouchableOpacity activeOpacity={1} onPress={() => toggle()} style={styleGlobal.padding_2}>
          <View style={styleGlobal.dflex_spaceBetween}>
            <Text style={[styleGlobal.paddingVertical_4, styles.viewTextLabel]}>
              {selected?.label ?? (placeholder && t(placeholder)) ?? t('Chọn ngay')}
            </Text>

            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <IconDown fill={hexToRgba(Colors.black, 0.4)} />
            </Animated.View>
          </View>
        </TouchableOpacity>

        {isMenu && (
          <View style={[styleGlobal.border, styles.viewMenu]}>
            {options?.map((i: IOptions, idx: number) => (
              <ItemSelect key={idx} data={i} setSelected={setSelected} hidden={hidden} selected={selected} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default React.memo(SelectCustom);

const styles = StyleSheet.create({
  viewTextLable: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: Platform.select({
      ios: 13,
      android: 14,
      default: 13,
    }),
    marginBottom: 4,
  },
  container: {
    ...styleGlobal.boxshadow,
    shadowOpacity: 0.2,
    borderRadius: 4,
    paddingHorizontal: 4,
    backgroundColor: 'white',
    paddingTop: Platform.select({
      ios: 6,
      android: 0,
      default: 0,
    }),
    paddingBottom: Platform.select({
      ios: 6,
      android: 0,
      default: 0,
    }),
    fontSize: 18,
    width: '100%',
    borderColor: hexToRgba(Colors.black, 0.2),
  },
  viewTextLabel: {
    color: Colors.textColor,
  },
  viewMenu: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    borderColor: hexToRgba(Colors.black, 0.2),
    backgroundColor: Colors.white,
    elevation: 10,
  },
  viewRequired: { color: 'red' },
});
