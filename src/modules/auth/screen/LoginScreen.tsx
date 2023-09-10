/* eslint-disable @typescript-eslint/no-shadow */
import { InputCustom } from 'components';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FormAuth from './FormAuth';
import { useForm, Controller } from 'react-hook-form';
import Colors from 'themes/Color';
import CheckBox from 'components/custom/CheckBox';
import { styleGlobal } from 'types/StyleGlobal';
import { IFormLogin } from './Function';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import { useTranslation } from 'react-i18next';
import { actions as authActions } from '../store';
import { useToast } from 'hooks/useToast';
import { useAppDispatch } from 'hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [saveLogin, setSaveLogin] = React.useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    defaultValues: {
      usename: '',
      password: '',
    },
  });

  const onSubmit = React.useCallback(
    async (data: IFormLogin) => {
      setLoading(true);
      await dispatch(authActions.login(data))
        .then(async (data: any) => {
          if (data?.payload?.status) {
            if (saveLogin) {
              await AsyncStorage.setItem('token', data?.payload?.token);
            }
            toast('success', 'Đăng nhập thành công.');
            return NavigationService.navigate(PathName.HOMESCREEN);
          } else {
            toast('error', data?.payload?.mess);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
      setLoading(false);
    },
    [dispatch, toast, saveLogin],
  );

  return (
    <FormAuth loading={loading} title="Đăng nhập" active={handleSubmit(onSubmit)} titleActive="Đăng nhập">
      <View style={styles.container}>
        <View>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống trường này.'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputCustom
                placeholder={t('Nhập tài khoản...')}
                label={t('Tài khoản:')}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
                inputStyle={errors.usename ? { borderColor: Colors.error } : undefined}
              />
            )}
            name="usename"
          />
          {errors.usename && <Text style={styles.viewTextInput}>{errors.usename.message}</Text>}
        </View>
        <View style={styles.viewGroup}>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống trường này.'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputCustom
                placeholder="********"
                secureTextEntry
                label={t('Mật khẩu:')}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
                inputStyle={errors.password ? { borderColor: Colors.error } : undefined}
              />
            )}
            name="password"
          />
          {errors.password && <Text style={styles.viewTextInput}>{errors.password.message}</Text>}
        </View>
        <View style={styles.viewGroup}>
          <View
            style={
              (styleGlobal.justifyContent_flexStart, styleGlobal.alignItems_center, styleGlobal.flexDirection_row)
            }>
            <Text style={styles.viewText}>{t('Bạn chưa có tài khoản?')}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.viewButtonRegister}
              onPress={() => NavigationService.navigate(PathName.REGISTERsCREEN)}>
              <Text style={styles.viewTextRegister}>{t('Đăng ký ngay.')}</Text>
            </TouchableOpacity>
          </View>
          <CheckBox textRight="Lưu mật khẩu." onChange={e => setSaveLogin(e)} />
        </View>
      </View>
    </FormAuth>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  container: {},
  viewTextInput: { color: Colors.error, paddingTop: 2 },
  viewGroup: {
    marginTop: 16,
  },
  viewTextRegister: {
    color: Colors.primary,
  },
  viewText: {
    color: Colors.black,
  },
  viewButtonRegister: { marginLeft: 10 },
});
