/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { IconClose } from 'assets/icons';
import React from 'react';
import { KeyboardType, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

type Props = {
  placeholder?: string;
  inputStyle?: ViewStyle;
  onChange?: (value: string) => void;
  type?: KeyboardType;
  initialState?: any;
  label?: string;
  icon?: any;
  iconLeft?: boolean;
  iconRight?: boolean;
  setValueSearch?: any;
  setFocused?: any;
  secureTextEntry?: any;
  close?: boolean;
  typeInput?: string;
};

const InputCustom = (props: Props) => {
  const {
    placeholder,
    inputStyle,
    onChange,
    type,
    initialState,
    label,
    icon,
    iconLeft,
    iconRight,
    setValueSearch,
    setFocused,
    secureTextEntry,
    close = true,
    typeInput = 'text',
  } = props;
  const [focus, setFocus] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');
  const handleSearch = (value: string) => {
    setValue(value);
  };
  React.useEffect(() => {
    setValueSearch && setValueSearch(value);
  }, [value]);

  return (
    <View style={{ position: 'relative' }}>
      {label && <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 4 }}>{label}</Text>}
      <View
        style={[
          styleGlobal.dFlex_center,
          styleGlobal.flexDirection_row,
          styleGlobal.border,
          styles.container,
          inputStyle,
          {
            borderColor: focus || value !== '' ? hexToRgba(Colors.black, 0.6) : 'rgba(0, 0, 0, 0.3)',
          },
          {
            justifyContent: 'space-between',
          },
        ]}>
        {iconLeft && icon}
        <TextInput
          secureTextEntry={secureTextEntry}
          onFocus={() => {
            setFocused && setFocused(!focus);
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          accessible={false}
          style={{
            padding: 4,
            width: '100%',
            zIndex: 10,
            paddingRight: 30,
          }}
          onChangeText={handleSearch}
          placeholder={placeholder}
          placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
          keyboardType={type ?? undefined}
          value={value}
          numberOfLines={1}
        />
        {value !== '' && !iconRight && close && (
          <TouchableOpacity
            onPress={() => {
              setValue('');
            }}
            style={{
              position: 'absolute',
              top: '26%',
              right: 10,
              zIndex: 100,
            }}>
            <IconClose fill={Colors.primary} />
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
    paddingTop: 6,
    paddingRight: 34,
    paddingBottom: 6,
    fontSize: 18,
    width: '100%',
  },
});
