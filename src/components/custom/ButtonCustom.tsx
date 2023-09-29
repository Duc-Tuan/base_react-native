/* eslint-disable react-native/no-inline-styles */
import { useColorPrimary } from 'hooks/useColorPrimary';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  View,
} from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

type Props = {
  text: string;
  hover?: boolean;
  disabled?: boolean;
  styleButton?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  typeButton?: 'cancel' | 'error' | 'main' | 'outline-main' | 'warning' | 'nomal' | 'disabled' | 'disabled-outline';
  action?: (data?: any) => void;
  IconLeft?: any;
};

const ButtonCustom = (props: Props) => {
  const { t } = useTranslation();
  const {
    text,
    action,
    typeButton = 'main',
    styleButton,
    styleText,
    hover = false,
    disabled = false,
    IconLeft,
  } = props;
  const [isHover, setIsHover] = React.useState<boolean>(false);
  const { colorPrimary } = useColorPrimary();

  const actionStyles = () => {
    let defaultStyles: ViewStyle = {
      backgroundColor: colorPrimary,
      borderColor: colorPrimary,
    };
    if (typeButton === 'outline-main') {
      return (defaultStyles = {
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: colorPrimary,
      });
    }
    if (typeButton === 'nomal') {
      return (defaultStyles = {
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      });
    }
    if (typeButton === 'cancel') {
      return (defaultStyles = {
        backgroundColor: '#C2185B',
        borderColor: '#C2185B',
      });
    }
    if (typeButton === 'disabled') {
      return (defaultStyles = {
        backgroundColor: hexToRgba(colorPrimary ?? Colors.primary, 0.5),
        borderColor: 'rgba(0, 0, 0, 0.1)',
      });
    }
    if (typeButton === 'disabled-outline') {
      return (defaultStyles = {
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: hexToRgba(colorPrimary ?? Colors.primary, 0.6),
      });
    }
    return defaultStyles;
  };

  const colorText = () => {
    let defaultStylesText: TextStyle = {
      color: isHover && isHover ? colorPrimary : 'white',
    };
    if (typeButton === 'outline-main') {
      return (defaultStylesText = {
        color: isHover && isHover ? 'white' : colorPrimary,
      });
    }
    if (typeButton === 'disabled-outline') {
      return (defaultStylesText = {
        color: isHover && isHover ? 'white' : hexToRgba(colorPrimary, 0.6),
      });
    }
    if (typeButton === 'nomal') {
      return (defaultStylesText = {
        color: isHover && isHover ? 'white' : 'rgba(0, 0, 0, 0.5)',
      });
    }
    return defaultStylesText;
  };

  return hover ? (
    <TouchableHighlight
      activeOpacity={1}
      onPress={action && action}
      style={[
        styles.container,
        styleGlobal.boxshadow,
        { borderRadius: 4, borderWidth: 1, ...actionStyles() },
        styleButton,
      ]}
      underlayColor={colorPrimary}
      onHideUnderlay={() => setIsHover(false)}
      onShowUnderlay={() => setIsHover(true)}>
      <Text
        style={[
          {
            ...colorText(),
          },
          styles.textView,
          styleText,
        ]}>
        {t(`${text}`)}
      </Text>
    </TouchableHighlight>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action && action}
      style={[
        styles.container,
        styleGlobal.boxshadow,
        { borderRadius: 4, borderWidth: 1, ...actionStyles() },
        styleButton,
      ]}
      disabled={disabled}>
      <View style={[styleGlobal.dFlex_center, styleGlobal.gap_6]}>
        {IconLeft && IconLeft}
        <Text
          style={[
            {
              ...colorText(),
            },
            styles.textView,
            styleText,
          ]}>
          {t(`${text}`)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonCustom);

const styles = StyleSheet.create({
  container: {
    minWidth: 70,
    maxWidth: 200,
    padding: Platform.select({
      ios: 8,
      android: 6,
      default: 0,
    }),
    borderRadius: 4,
  },
  textView: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
