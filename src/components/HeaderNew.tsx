/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { IconAdd, IconCart, IconClose, IconLeft, IconSearch, IconUser } from 'assets/icons';
import { PathName } from 'configs';
import { useBoolean } from 'hooks/useBoolean';
import { useColorPrimary } from 'hooks/useColorPrimary';
import useDebounce from 'hooks/useDebounce';
import { useGetAccount } from 'hooks/useGetAccount';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';
import { checkNullish } from 'utils/genal';
import { getStatusBarHeight } from 'utils/iphoneXHelper';
import { ImageCustom } from 'components';
import useGetCart from 'hooks/useGetCart';

interface IProps {
  hiddenBack?: boolean;
  hiddenSearch?: boolean;
  hiddenAdd?: boolean;
  rightIcon?: React.ReactNode;
  isRightIcon?: boolean;
  isUser?: boolean;
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
  onBackPress,
  setTextSearch,
  title,
  placeholder,
  titleStyle,
  hiddenSearch,
  hiddenAdd,
  handleAdd,
  rightIcon,
  isRightIcon,
  isUser,
  handleRight,
}) => {
  const { t } = useTranslation();
  const { colorPrimary } = useColorPrimary();
  const [isOpenSearch, { on, off }] = useBoolean();
  const [text, setText] = React.useState<string>('');
  const textDebounce = useDebounce(text, 500);
  const { user, isLogin } = useGetAccount();
  const { cartLength } = useGetCart();

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
    } else if (isLogin) {
      NavigationService.navigate(PathName.PROFILESCREEN);
    } else if (!isLogin) {
      NavigationService.navigate(PathName.LOGINSCREEN);
    }
  }, [hiddenBack, isOpenSearch, onBackPress, onChangeText, off, isLogin]);

  const onSubmitEditing = React.useCallback(() => {
    onChangeText(text);
  }, [onChangeText, text]);

  const handleToggleSearch = React.useCallback(() => {
    on();
  }, [on]);

  return (
    <View style={[styles.viewHeader]}>
      <View style={[StyleSheet.absoluteFillObject, styles.viewBgHeader, { backgroundColor: colorPrimary }]}>
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
          <TouchableOpacity onPress={handleBack} style={[styles.viewBack]} activeOpacity={0.8}>
            {isOpenSearch ? (
              <IconClose fill={Colors.white} />
            ) : (
              <React.Fragment>
                {isUser ? (
                  isLogin ? (
                    <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
                      <View style={[styleGlobal.padding_2, styles.viewIsUser]}>
                        <ImageCustom urlImeg={user?.userImage} styleWapper={[styles.viewImageUser]} />
                      </View>
                      <View>
                        <Text style={styles.viewTextOpcity}>{t('Xem chi tiết')}</Text>
                        <Text numberOfLines={1} style={[styleGlobal.textBold, styles.viewTextNameUser]}>
                          {checkNullish(user?.userNickname) ?? t('Đang cập nhập...')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <IconUser fill={Colors.white} width={28} height={28} />
                  )
                ) : (
                  !hiddenBack && <IconLeft fill={Colors.white} />
                )}
              </React.Fragment>
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
            {title && t(title)}
          </Text>
        )}

        <View style={[styles.viewRight]}>
          {!hiddenSearch && !isOpenSearch && (
            <TouchableOpacity onPress={handleToggleSearch} style={styles.viewButtonActions} activeOpacity={0.8}>
              <IconSearch fill={Colors.white} />
            </TouchableOpacity>
          )}

          {hiddenAdd && (
            <TouchableOpacity onPress={handleAdd} style={styles.viewButtonActions} activeOpacity={0.8}>
              <IconAdd fill={Colors.white} />
            </TouchableOpacity>
          )}

          {rightIcon && (
            <TouchableOpacity onPress={handleRight} style={styles.viewButtonActions} activeOpacity={0.8}>
              {rightIcon}
            </TouchableOpacity>
          )}

          {!isRightIcon && (
            <View style={styles.ViewCart}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => NavigationService.navigate(PathName.CARTSCREEN)}
                style={styles.viewButtonActions}>
                <IconCart fill={Colors.white} />
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    styleGlobal.dFlex_center,
                    styleGlobal.border,
                    styles.notification,
                  ]}>
                  <Text style={styles.ViewTextnotification}>{cartLength}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderNew;

const styles = StyleSheet.create({
  viewHeader: { paddingTop: getStatusBarHeight() },
  viewImage: { width: '100%', height: '100%' },
  viewContentHeader: { paddingVertical: 10 },
  viewBgHeader: {
    // backgroundColor: Colors.primary,
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
  notification: {
    left: 18,
    top: -2,
    backgroundColor: 'red',
    borderRadius: 100,
    height: 16,
    width: 16,
    borderColor: Colors.white,
  },
  ViewTextnotification: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '700',
  },
  ViewCart: { position: 'relative' },
  viewMenuCart: {
    position: 'absolute',
    top: 38,
    right: 0,
    backgroundColor: Colors.white,
    height: 400,
    width: 300,
    borderRadius: 4,
    padding: 10,
    zIndex: 1000,
  },
  viewMenu: {
    height: '90%',
  },
  viewIsUser: {
    borderRadius: 30,
    borderColor: Colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  viewImageUser: {
    width: 24,
    height: 24,
    borderRadius: 30,
    padding: 10,
  },
  viewTextNameUser: {
    color: Colors.white,
    maxWidth: 160,
  },
  viewTextOpcity: {
    color: hexToRgba(Colors.white, 0.6),
    fontSize: 8,
    fontWeight: '700',
  },
});
