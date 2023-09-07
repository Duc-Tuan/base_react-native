/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { IconClose, IconEye, IconEyeOff } from 'assets/icons';
import { useBoolean } from 'hooks/useBoolean';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardType,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

type Props = {
  placeholder?: string;
  inputStyle?: StyleProp<ViewStyle>;
  onChange?: (value: string) => void;
  type?: KeyboardType;
  // initialState?: any;
  label?: string;
  valueText?: string;
  icon?: any;
  iconLeft?: boolean;
  iconRight?: boolean;
  setValueSearch?: any;
  setFocused?: any;
  secureTextEntry?: any;
  close?: boolean;
  onBlur?: any;
  required?: boolean;
};

const InputCustom = (props: Props) => {
  const {
    placeholder,
    inputStyle,
    onChange,
    type,
    // initialState,
    label,
    icon,
    iconLeft,
    iconRight,
    setValueSearch,
    setFocused,
    secureTextEntry,
    close = true,
    valueText,
    onBlur,
    required,
  } = props;
  const { t } = useTranslation();
  const [focus, setFocus] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(valueText ?? '');
  const [showPassword, { on, off, toggle }] = useBoolean(secureTextEntry ?? false);
  const handleSearch = (value: string) => {
    onChange && onChange(value);
    setValue(value);
  };
  React.useEffect(() => {
    setValueSearch && setValueSearch(valueText ?? value);
    setValue(valueText ?? '');
  }, [value, valueText]);

  return (
    <View style={{ position: 'relative' }}>
      {label && (
        <Text
          style={{
            fontWeight: '600',
            color: Colors.black,
            fontSize: Platform.select({
              ios: 13,
              android: 14,
              default: 13,
            }),
            marginBottom: 4,
          }}>
          {t(label)}
          {required && (
            <Text style={{ color: hexToRgba(Colors.black, 0.6) }}>
              (<Text style={styles.viewRequired}>*</Text>)
            </Text>
          )}
        </Text>
      )}
      <View
        style={[
          styleGlobal.dFlex_center,
          styleGlobal.flexDirection_row,
          styleGlobal.border,
          styles.container,
          {
            borderColor: focus || value !== '' ? hexToRgba(Colors.primary, 0.6) : 'rgba(0, 0, 0, 0.1)',
          },
          {
            justifyContent: 'space-between',
          },
          inputStyle,
        ]}>
        {iconLeft && icon}
        <TextInput
          secureTextEntry={showPassword}
          onFocus={() => {
            setFocused && setFocused(!focus);
            setFocus(true);
          }}
          onBlur={onBlur}
          accessible={false}
          style={styles.viewTextInput}
          onChangeText={handleSearch}
          placeholder={placeholder}
          cursorColor={Colors.primary}
          placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
          keyboardType={type ?? undefined}
          value={value}
          numberOfLines={1}
        />
        {value !== '' && !iconRight && close && (
          <TouchableOpacity
            onPress={() => {
              setValue('');
            }}
            style={styles.viewIconRight}>
            <IconClose fill={Colors.primary} />
          </TouchableOpacity>
        )}
        {!iconRight && secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              toggle();
            }}
            style={styles.viewIconRight}>
            {showPassword ? (
              <IconEyeOff fill={hexToRgba(Colors.black, 0.4)} width={20} height={20} />
            ) : (
              <IconEye fill={hexToRgba(Colors.black, 0.4)} width={20} height={20} />
            )}
          </TouchableOpacity>
        )}
        {iconRight && icon}
      </View>
    </View>
  );
};

export default React.memo(InputCustom);

const styles = StyleSheet.create({
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
    paddingRight: 34,
    paddingBottom: Platform.select({
      ios: 6,
      android: 0,
      default: 0,
    }),
    fontSize: 18,
    width: '100%',
  },
  viewTextInput: { padding: 4, width: '100%', zIndex: 10, paddingRight: 10, color: Colors.black },
  viewIconRight: { position: 'absolute', top: '20%', right: 10, zIndex: 100 },
  viewRequired: { color: 'red' },
});
