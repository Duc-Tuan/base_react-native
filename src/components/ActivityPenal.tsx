/* eslint-disable prettier/prettier */
import { useLayout } from '@react-native-community/hooks';
import { IconLeft } from 'assets/icons';
import NavigationService from 'naviagtion/stack/NavigationService';
import React, { FC } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Colors from 'themes/Color';
import { getStatusBarHeight } from 'utils/iphoneXHelper';
import LoadingOverley from './LoadingOverley';

interface Props {
  children?: React.ReactNode;
  isLoading?: boolean;
  styleChildren?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  enabled?: boolean;
  renderHeader?: React.ReactNode;
  hiddenImageBackground?: boolean;
  wapperStyleHeader?: StyleProp<ViewStyle>;
  renderHeaderContent?: React.ReactNode;
  styleHeader?: StyleProp<ViewStyle>;
  rightIconStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  title?: string;
  hiddenBack?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onBackPress?: () => void;
  adjustsFontSizeToFit?: boolean;
}

const ActivityPenal: FC<Props> = ({
  children,
  isLoading,
  styleChildren,
  containerStyle,
  enabled = Platform.OS === 'android',
  renderHeader,
  hiddenImageBackground,
  wapperStyleHeader,
  renderHeaderContent,
  styleHeader,
  title,
  hiddenBack,
  leftIcon,
  rightIcon,
  rightIconStyle,
  titleStyle,
  onBackPress,
  adjustsFontSizeToFit,
}) => {
  const { width } = useWindowDimensions();
  const { onLayout: onLayoutRight, width: widthRight } = useLayout();
  const widthHeaderLeft = React.useMemo(() => (widthRight > 0.15 * width ? widthRight : '15%'), [width, widthRight]);

  return (
    <View style={[styles.container, containerStyle]}>
      <LoadingOverley visible={isLoading} />

      {renderHeader ? (
        renderHeader
      ) : (
        <View
          style={[
            styles.viewHeader,
            !!hiddenImageBackground && styles.backgroundHidden,
            // isShowBorderHeader && styles.borderHeader,
            wapperStyleHeader,
          ]}>
          {!hiddenImageBackground && (
            <View style={[StyleSheet.absoluteFillObject, styles.viewBgHeader]}>
              <Image source={require('assets/images/linear-header.png')} style={styles.viewImage} />
            </View>
          )}

          {renderHeaderContent || (
            <View style={[styles.viewContentHeader, styleHeader]}>
              <View style={[styles.viewLeft, { width: widthHeaderLeft }]}>
                {!hiddenBack && (
                  <TouchableOpacity onPress={onBackPress || NavigationService.goBack} style={styles.viewBack}>
                    {leftIcon || <IconLeft fill={Colors.white} />}
                  </TouchableOpacity>
                )}
              </View>

              <Text
                numberOfLines={1}
                adjustsFontSizeToFit={adjustsFontSizeToFit}
                style={StyleSheet.flatten([styles.textTitle, titleStyle])}>
                {title}
              </Text>

              <View onLayout={onLayoutRight} style={[styles.viewRight, rightIconStyle]}>
                {rightIcon}
              </View>
            </View>
          )}
        </View>
      )}

      {enabled ? (
        <KeyboardAvoidingView behavior={'height'} style={[styles.viewChildren, styleChildren]}>
          {children}
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.viewChildren, styleChildren]}>{children}</View>
      )}
    </View>
  );
};

export default React.memo(ActivityPenal);

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewHeader: { paddingTop: getStatusBarHeight() },
  viewBgHeader: {
    backgroundColor: Colors.primary,
    height: 200,
    borderBottomEndRadius: 120,
    borderBottomStartRadius: 120,
  },
  viewImage: { height: '100%', width: '100%' },
  viewLeft: { width: '15%', height: 40 },
  viewRight: { minWidth: '15%', alignItems: 'flex-end' },
  textTitle: { fontSize: 17, fontWeight: '600', textAlign: 'center', color: '#FFFFFF', flex: 1 },
  viewBack: { paddingLeft: 15, justifyContent: 'center', flex: 1, height: 40 },
  viewChildren: { flex: 1},
  viewContentHeader: { height: 40, flexDirection: 'row', alignItems: 'center' },
  borderHeader: { borderBottomWidth: 1, borderBottomColor: '#DCE0E0' },
  backgroundHidden: { backgroundColor: 'transparent' },
});
