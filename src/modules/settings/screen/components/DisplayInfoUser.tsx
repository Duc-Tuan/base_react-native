/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
// import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker, { Image, Options } from 'react-native-image-crop-picker';
import React from 'react';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';
import { ButtonCustom, ImageCustom, WrapperModal } from 'components';
import { useTranslation } from 'react-i18next';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import { checkNullish } from 'utils/genal';
import { TouchableOpacity } from 'react-native';
import { IconCameraV2 } from 'assets/icons';
import { useBoolean } from 'hooks/useBoolean';
import { IUser } from 'types/auth-types';
import { actions as authActions } from 'modules/auth/store';
import { useAppDispatch } from 'hooks';
import { ApiuploadImage } from 'assets/api';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useToast } from 'hooks/useToast';

interface IProps {
  colorPrimary?: string;
  user: IUser;
  isLogin: boolean;
}

const DisplayInfoUser: React.FC<IProps> = ({ colorPrimary, user, isLogin }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { showActionSheetWithOptions } = useActionSheet();
  const [dataImage, setDataImage] = React.useState<string | undefined>(user?.userImage);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<{ url?: string; file: any }>({
    url: dataImage ?? '',
    file: '',
  });
  const [isPopUp, { on, off, toggle }] = useBoolean();
  const dispatch = useAppDispatch();

  const changeScreen = React.useCallback(() => {
    NavigationService.navigate(PathName.PROFILESCREEN);
  }, []);

  const hiddenPopup = React.useCallback(() => {
    setSelectedImage({ url: dataImage, file: '' });
    off();
  }, []);

  const changeLogin = React.useCallback(() => NavigationService.navigate(PathName.LOGINSCREEN), []);
  const changeRegister = React.useCallback(() => NavigationService.navigate(PathName.REGISTERsCREEN), []);

  const footer = React.useCallback(
    () => [
      <ButtonCustom
        text="Cập nhật"
        action={handleuUpdateImage}
        disabled={loading}
        typeButton={loading ? 'disabled' : 'main'}
      />,
    ],
    [selectedImage, loading],
  );

  const openImagePicker = React.useCallback(async () => {
    // showActionSheetWithOptions(
    //   { options: [t('Thư viện ảnh'), t('Chụp ảnh'), t('Đóng')], cancelButtonIndex: 2 },
    //   async index => {},
    // );
    try {
      let response: Image | undefined;

      const options: Options = {
        multiple: false,
        mediaType: 'photo',
        includeBase64: true,
        cropping: true,
        showCropGuidelines: true,
        compressImageQuality: 1,
        cropperCancelText: t('Đóng'),
        cropperChooseText: t('Chọn'),
        cropperToolbarTitle: t('Chỉnh sửa ảnh'),
        width: 512,
        height: 512,
      };
      response = await ImagePicker.openPicker(options);

      // if (index === 0) {
      //   response = await ImagePicker.openPicker(options);
      // } else if (index === 1) {
      //   response = await ImagePicker.openCamera(options);
      // }
      setSelectedImage({ url: `data:image/png;base64,${response?.data}`, file: response?.data });
      on();
    } catch (error) {}
  }, [t]);

  const handleuUpdateImage = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiuploadImage.upload({ imageBase64: selectedImage?.file });
      const data: IUser = {
        ...user,
        userImage: res?.downloadURL,
        userImageMulter: res?.nameFile,
      };
      const resUser = await dispatch(authActions.changeInfo(data));
      setDataImage(res?.downloadURL);

      toast(
        resUser?.payload?.status ? 'success' : 'error',
        resUser?.payload?.status ? t('Cập nhật thông tin thành công.') : t('Cập nhật thông tin thất bại.'),
      );
      setLoading(false);
      off();
    } catch (error) {
      console.log(error);
    }
  }, [selectedImage, t]);

  const handleLogout = React.useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <>
      {isLogin ? (
        <TouchableWithoutFeedback onPress={changeScreen}>
          <View style={[styleGlobal.padding_10, styleGlobal.boxshadow, styles.container]}>
            <View style={[styleGlobal.flexDirection_row, styleGlobal.gap_18]}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => on()}>
                <>
                  <View
                    style={[
                      styleGlobal.border,
                      styleGlobal.padding_2,
                      styles.viewImage,
                      { borderColor: colorPrimary },
                    ]}>
                    <ImageCustom urlImeg={dataImage} styleWapper={[styles.viewImg]} />
                  </View>
                  <View style={[styleGlobal.dFlex_center, StyleSheet.absoluteFillObject, styles.viewCamera]}>
                    <IconCameraV2 fill={colorPrimary} />
                  </View>
                </>
              </TouchableOpacity>

              <View>
                <Text style={[styleGlobal.textPrimary, styleGlobal.textFontBold]}>
                  {checkNullish(user?.userNickname) ?? t('Đang cập nhập...')}
                </Text>
                <ButtonCustom text="Đăng xuất" styleButton={styles.viewLogout} action={handleLogout} />
              </View>
            </View>

            <View
              style={[
                styleGlobal.padding_6,
                styles.viewSub,
                { backgroundColor: hexToRgba(colorPrimary ?? Colors.primary, 0.05) },
              ]}>
              <Text style={[styleGlobal.textPrimary]}>
                {t('Giới tính')}: {checkNullish(user?.userGender) ?? t('Đang cập nhập...')}
              </Text>
              <Text style={[styleGlobal.textPrimary]}>
                {t('Năm sinh')}: {checkNullish(user?.userAge) ?? t('Đang cập nhập...')}
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
          <TouchableOpacity activeOpacity={0.9} onPress={openImagePicker}>
            <View style={[styleGlobal.dFlex_center, styleGlobal.flexDirection_column, styleGlobal.paddingVertical_20]}>
              <View
                style={[
                  styleGlobal.border,
                  styleGlobal.padding_2,
                  styles.viewImage,
                  styles.viewImageChange,
                  { borderColor: colorPrimary },
                ]}>
                <ImageCustom urlImeg={selectedImage?.url} styleWapper={[styles.viewImg]} />
              </View>

              <View style={styleGlobal.paddingVertical_8}>
                <Text style={styleGlobal.textCenter}>Thay đổi</Text>
                <Text style={[styleGlobal.textCenter, styleGlobal.textFontSize_12]}>Định dạng ảnh: png, jpg,...</Text>
                <Text style={[styleGlobal.textCenter, styleGlobal.textFontSize_12]}>Dung lượng ảnh tối đa: 3MB</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  viewImageChange: {
    width: 100,
    height: 100,
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
