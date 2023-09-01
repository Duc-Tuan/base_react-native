/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import React from 'react';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';
import { ButtonCustom, WrapperModal } from 'components';
import { useTranslation } from 'react-i18next';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import { checkNullish } from 'utils/genal';
import { IUserGlobal } from 'modules/auth/screen/Function';
import { TouchableOpacity } from 'react-native';
import { IconCameraV2 } from 'assets/icons';
import { useBoolean } from 'hooks/useBoolean';

interface IProps {
  colorPrimary?: string;
  user: IUserGlobal;
  isLogin: boolean;
}

const DisplayInfoUser: React.FC<IProps> = ({ colorPrimary, user, isLogin }) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = React.useState<string>('');
  const [isPopUp, { on, off, toggle }] = useBoolean();

  const changeScreen = React.useCallback(() => {
    NavigationService.navigate(PathName.PROFILESCREEN);
  }, []);

  const hiddenPopup = React.useCallback(() => off(), []);

  const changeLogin = React.useCallback(() => NavigationService.navigate(PathName.LOGINSCREEN), []);
  const changeRegister = React.useCallback(() => NavigationService.navigate(PathName.REGISTERsCREEN), []);

  const footer = [<ButtonCustom text="Cập nhật" />];

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  console.log(selectedImage);

  return (
    <>
      {isLogin ? (
        <TouchableWithoutFeedback onPress={changeScreen}>
          <View style={[styleGlobal.padding_10, styleGlobal.boxshadow, styles.container]}>
            <View style={[styleGlobal.flexDirection_row, styleGlobal.gap_18]}>
              <TouchableOpacity activeOpacity={0.9} onPress={openImagePicker}>
                <>
                  <View
                    style={[
                      styleGlobal.border,
                      styleGlobal.padding_2,
                      styles.viewImage,
                      { borderColor: colorPrimary },
                    ]}>
                    <Image source={user?.image} style={[styleGlobal.image, styles.viewImg]} />
                  </View>
                  <View style={[styleGlobal.dFlex_center, StyleSheet.absoluteFillObject, styles.viewCamera]}>
                    <IconCameraV2 fill={Colors.primary} />
                  </View>
                </>
              </TouchableOpacity>

              <View>
                <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold]}>
                  {checkNullish(user?.name) ?? t('Đang cập nhập...')}
                </Text>
                <ButtonCustom text="Đăng xuất" styleButton={styles.viewLogout} />
              </View>
            </View>

            <View
              style={[
                styleGlobal.padding_6,
                styles.viewSub,
                { backgroundColor: hexToRgba(colorPrimary ?? Colors.primary, 0.05) },
              ]}>
              <Text style={[styleGlobal.textPrimary]}>
                {t('Giới tính')}: {checkNullish(user.gender) ?? t('Đang cập nhập...')}
              </Text>
              <Text style={[styleGlobal.textPrimary]}>
                {t('Năm sinh')}: {checkNullish(user.age) ?? t('Đang cập nhập...')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View
          style={[
            styleGlobal.padding_14,
            styleGlobal.justifyContent_center,
            styleGlobal.boxshadow,
            styles.container,
            styles.containerNull,
          ]}>
          <Text style={styles.viewTextNullLogin}>
            {t('Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin chi tiết.')}
          </Text>

          <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.marginTop_14]}>
            <ButtonCustom text="Đăng nhập" styleButton={styleGlobal.flex_1} action={changeLogin} />
            <ButtonCustom text="Đăng ký" styleButton={styleGlobal.flex_1} action={changeRegister} />
          </View>
        </View>
      )}
      {isPopUp && (
        <WrapperModal
          isVisible={isPopUp}
          hiddenPopup={hiddenPopup}
          textHeader="Đổi ảnh đại diện"
          isFooter
          footer={footer}>
          <Text>ahdgasjhd</Text>
        </WrapperModal>
      )}
    </>
  );
};

export default React.memo(DisplayInfoUser);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  containerNull: {
    minHeight: 160,
  },
  viewImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
  },
  viewImg: {
    borderRadius: 100,
  },
  viewSub: {
    marginTop: 10,
    borderRadius: 4,
  },
  viewLogout: {
    padding: 2,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  viewTextNullLogin: {
    color: Colors.black,
    fontSize: 16,
  },
  viewCamera: {
    backgroundColor: Colors.white,
    width: 30,
    height: 30,
    borderRadius: 40,
    top: 26,
    left: 28,
    transform: [{ scale: 1.01 }],
  },
});
