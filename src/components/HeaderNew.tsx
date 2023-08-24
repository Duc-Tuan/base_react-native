/* eslint-disable react-hooks/exhaustive-deps */
import { IconAdd, IconClose, IconLeft, IconSearch } from 'assets/icons';
import { useBoolean } from 'hooks/useBoolean';
import useDebounce from 'hooks/useDebounce';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { getStatusBarHeight } from 'utils/iphoneXHelper';

interface IProps {
  hiddenBack?: boolean;
  hiddenSearch?: boolean;
  hiddenAdd?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onBackPress?: () => void;
  setTextSearch?: (value: string) => void;
  title?: string;
  placeholder?: string;
  titleStyle?: StyleProp<TextStyle>;
  handleAdd?: () => void;
  handleRight?: () => void;
}

const HeaderNew: React.FC<IProps> = ({
  hiddenBack,
  leftIcon,
  onBackPress,
  setTextSearch,
  title,
  placeholder,
  titleStyle,
  hiddenSearch,
  hiddenAdd,
  handleAdd,
  rightIcon,
  handleRight,
}) => {
  const [isOpenSearch, { on, off }] = useBoolean();
  const [text, setText] = React.useState<string>('');
  const textDebounce = useDebounce(text, 500);

  React.useEffect(() => {
    if (setTextSearch) {
      setTextSearch(textDebounce);
    }
  }, [textDebounce]);

  const onChangeText = React.useCallback(
    (value: string) => {
      setText(value);
      !!setTextSearch && setTextSearch(value);
    },
    [setTextSearch],
  );

  const handleBack = React.useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else if (isOpenSearch) {
      onChangeText('');
      off();
    } else if (!hiddenBack) {
      NavigationService.goBack();
    }
  }, [hiddenBack, isOpenSearch, onBackPress, onChangeText, off]);

  const onSubmitEditing = React.useCallback(() => {
    onChangeText(text);
  }, [onChangeText, text]);

  const handleToggleSearch = React.useCallback(() => {
    on();
  }, [on]);

  return (
    <View style={[styles.viewHeader]}>
      <View style={[StyleSheet.absoluteFillObject, styles.viewBgHeader]}>
        <Image source={require('assets/images/linear-header.png')} style={styles.viewImage} />
      </View>

      <View
        style={[
          styleGlobal.flexDirection_row,
          styleGlobal.justifyContent_spaceBetween,
          styleGlobal.alignItems_center,
          styles.viewContentHeader,
        ]}>
        <View style={[styles.viewLeft, !!hiddenBack && !isOpenSearch && styles.pr0]}>
          <TouchableOpacity onPress={handleBack} style={styles.viewBack}>
            {leftIcon ? (
              leftIcon
            ) : isOpenSearch ? (
              <IconClose fill={Colors.white} />
            ) : (
              <React.Fragment>{!hiddenBack && <IconLeft fill={Colors.white} />}</React.Fragment>
            )}
          </TouchableOpacity>
        </View>
        {isOpenSearch ? (
          <View style={styles.viewInput}>
            <TextInput
              autoFocus
              numberOfLines={1}
              returnKeyType="search"
              placeholder={placeholder ?? 'Tìm kiếm nhanh'}
              value={text}
              onChangeText={setText}
              onSubmitEditing={onSubmitEditing}
              placeholderTextColor={Colors.textSecond}
              style={styles.textInput}
            />
          </View>
        ) : (
          <Text numberOfLines={1} style={StyleSheet.flatten([styles.textTitle, titleStyle])}>
            {title}
          </Text>
        )}

        <View style={styles.viewRight}>
          {!hiddenSearch && !isOpenSearch && (
            <TouchableOpacity onPress={handleToggleSearch} style={styles.viewButtonActions}>
              <IconSearch fill={Colors.white} />
            </TouchableOpacity>
          )}

          {hiddenAdd && (
            <TouchableOpacity onPress={handleAdd} style={styles.viewButtonActions}>
              <IconAdd fill={Colors.white} />
            </TouchableOpacity>
          )}

          {rightIcon && (
            <TouchableOpacity onPress={handleRight} style={styles.viewButtonActions}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(HeaderNew);

const styles = StyleSheet.create({
  viewHeader: { paddingTop: getStatusBarHeight() },
  viewImage: { width: '100%', height: '100%' },
  viewContentHeader: { paddingVertical: 10 },
  viewBgHeader: {
    backgroundColor: Colors.primary,
    height: 200,
    borderBottomEndRadius: 120,
    borderBottomStartRadius: 120,
  },
  viewLeft: { paddingLeft: 15, paddingRight: 15, height: 40 },
  viewBack: { justifyContent: 'center', height: 40 },
  textTitle: { fontSize: 17, fontWeight: '600', textAlign: 'left', color: Colors.white },
  viewRight: { flexDirection: 'row', alignItems: 'center', paddingRight: 15 },
  pr0: { paddingRight: 0 },
  viewInput: {
    height: 34,
    borderRadius: 6,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    height: 34,
    margin: 0,
    padding: 0,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textColor,
  },
  viewButtonActions: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
