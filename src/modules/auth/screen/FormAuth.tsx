import { IconHome, IconLeft } from 'assets/icons';
import { ButtonCustom, ButtonIcon } from 'components';
import { PathName } from 'configs';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Colors from 'themes/Color';
import { heightFull, styleGlobal, widthFull } from 'types/StyleGlobal';

interface IProps {
  children: React.ReactNode;
  title: string;
  titleActive: string;
  active: () => void;
  stylesWrapper?: ViewStyle;
  stylesTitle?: ViewStyle;
  loading?: boolean;
}

const FormAuth: React.FC<IProps> = ({
  children,
  title,
  titleActive,
  active,
  stylesWrapper,
  loading = false,
  stylesTitle,
}) => {
  const { t } = useTranslation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require('assets/images/linear-header.png')}
          style={[StyleSheet.absoluteFillObject, styles.ViewImage]}
        />

        <SafeAreaView>
          <View style={[styleGlobal.dflex_spaceBetween, styles.viewHeader]}>
            <ButtonIcon
              icon={<IconLeft fill={Colors.primary} />}
              buttonStyle={styles.btnBack}
              onPress={NavigationService.goBack}
            />
            <ButtonIcon
              icon={<IconHome fill={Colors.primary} />}
              buttonStyle={styles.btnBack}
              onPress={() => NavigationService.navigate(PathName.HOMESCREEN)}
            />
          </View>
        </SafeAreaView>

        <View style={[StyleSheet.absoluteFillObject, styles.viewBg]} />
        <Text style={[StyleSheet.absoluteFillObject, styles.viewText, stylesTitle]}>{t(title)}</Text>

        <View style={[StyleSheet.absoluteFillObject, styles.main, stylesWrapper]}>
          <View style={[styleGlobal.flexDirection_column, styleGlobal.gap_10, styleGlobal.justifyContent_spaceBetween]}>
            {children}
            <View style={[styleGlobal.justifyContent_flexEnd, styleGlobal.flexDirection_row]}>
              <ButtonCustom
                text={titleActive}
                action={active}
                styleButton={styles.viewButton}
                disabled={loading}
                typeButton={loading ? 'disabled' : 'main'}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(FormAuth);

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.primary, height: heightFull, position: 'relative' },
  viewHeader: { paddingHorizontal: 20, paddingVertical: 20 },
  ViewImage: {
    width: widthFull,
    height: 400,
  },
  viewBg: {
    width: heightFull,
    height: heightFull,
    backgroundColor: Colors.white,
    top: 260,
    left: Platform.select({
      android: -220,
      ios: -160,
      default: 0,
    }),
    borderRadius: 40,
    transform: [{ rotate: '55deg' }],
  },
  btnBack: {
    backgroundColor: Colors.white,
  },
  viewText: {
    fontWeight: '700',
    color: Colors.black,
    fontSize: 18,
    top: 240,
    left: 180,
  },
  main: {
    top: 360,
    bottom: 40,
    marginHorizontal: 20,
  },
  viewButton: {
    flex: 1,
  },
});
