/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableHighlight, TouchableOpacity, ViewStyle } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

type Props = {
  text: string;
  hover?: boolean;
  disabled?: boolean;
  styleButton?: ViewStyle;
  styleText?: TextStyle;
  typeButton?: 'cancel' | 'error' | 'main' | 'outline-main' | 'warning' | 'nomal' | 'disabled';
  action?: () => void;
};

const ButtonCustom = (props: Props) => {
  const { text, action, typeButton = 'main', styleButton, styleText, hover = false, disabled = false } = props;
  const [isHover, setIsHover] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log('buttomC....');
  }, []);

  const actionStyles = () => {
    let defaultStyles: ViewStyle = {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
    };
    if (typeButton === 'outline-main') {
      return (defaultStyles = {
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: Colors.primary,
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
        backgroundColor: hexToRgba(Colors.black, 0.3),
        borderColor: 'rgba(0, 0, 0, 0.1)',
      });
    }
    return defaultStyles;
  };

  const colorText = () => {
    let defaultStylesText: TextStyle = {
      color: isHover && isHover ? Colors.primary : 'white',
    };
    if (typeButton === 'outline-main') {
      return (defaultStylesText = {
        color: isHover && isHover ? 'white' : Colors.primary,
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
        { borderRadius: 4, borderWidth: 1, ...actionStyles(), ...styleButton },
      ]}
      underlayColor={Colors.primary}
      onHideUnderlay={() => setIsHover(false)}
      onShowUnderlay={() => setIsHover(true)}>
      <Text
        style={[
          {
            ...colorText(),
            ...styleText,
          },
          styles.textView,
        ]}>
        {text}
      </Text>
    </TouchableHighlight>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action && action}
      style={[
        styles.container,
        styleGlobal.boxshadow,
        { borderRadius: 4, borderWidth: 1, ...actionStyles(), ...styleButton },
      ]}
      disabled={disabled}>
      <Text
        style={[
          {
            ...colorText(),
            ...styleText,
          },
          styles.textView,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonCustom);

const styles = StyleSheet.create({
  container: {
    minWidth: 70,
    maxWidth: 200,
    padding: 4,
    borderRadius: 4,
  },
  textView: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
