import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, TouchableOpacity, StyleProp, TextStyle, Text, StyleSheet } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';

interface IProps {
  title?: string;
  url: string;
  stylesWrapper?: StyleProp<TextStyle>;
  children: React.ReactElement;
}

const OpentURL: React.FC<IProps> = ({ title, url, stylesWrapper, children }) => {
  const { t } = useTranslation();
  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    // const supported = await Linking.canOpenURL(url);
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={stylesWrapper}>
      {title && <Text style={[styleGlobal.textBg, styles.viewText]}>{t(title)}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(OpentURL);

const styles = StyleSheet.create({ viewText: {} });
