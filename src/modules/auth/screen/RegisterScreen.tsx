/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import { InputCustom } from 'components';
import { PathName } from 'configs';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import FormAuth from './FormAuth';
import { IFormRegister } from './Function';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from 'utils/genal';
import { ApiAuths } from 'assets/api';
import { useToast } from 'hooks/useToast';

const RegisterScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormRegister>({
    defaultValues: {
      usename: '',
      userEmail: '',
      password: '',
      passwordCofirm: '',
    },
  });

  const onSubmit = React.useCallback(async (data: IFormRegister) => {
    const dataRegister = {
      usename: data?.usename,
      password: data?.password,
      userEmail: data?.userEmail,
    };
    setLoading(true);
    const res = await ApiAuths.register(dataRegister);
    setLoading(false);
    toast(res?.status ? 'success' : 'error', res.mess);
    if (res?.status) {
      return NavigationService.navigate(PathName.LOGINSCREEN);
    }
  }, []);

  const isValidPasswordCofirm = React.useCallback((data: string) => {
    if (getValues('password') !== data) {
      return 'Mật khẩu nhập lại không chính xác.';
    }
    return true;
  }, []);

  return (
    <FormAuth
      loading={loading}
      title="Đăng ký"
      active={handleSubmit(onSubmit)}
      titleActive="Đăng ký"
      stylesWrapper={styles.customs}>
      <View style={styles.container}>
        <View style={styles.viewGroup}>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống trường này.'),
              validate: value => {
                if (isValidEmail(value) === true) return undefined;
                return isValidEmail(value);
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputCustom
                placeholder={t('Nhập email...')}
                label={t('Email: ')}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
                inputStyle={errors.userEmail ? { borderColor: Colors.error } : undefined}
              />
            )}
            name="userEmail"
          />
          {errors.userEmail && <Text style={styles.viewTextInput}>{errors.userEmail.message}</Text>}
        </View>
        <View style={styles.viewGroup}>
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
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống trường này.'),
              validate: value => {
                if (isValidPasswordCofirm(value) === true) return undefined;
                return isValidPasswordCofirm(value);
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputCustom
                placeholder="********"
                secureTextEntry
                label={t('Nhập lại mật khẩu:')}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
                inputStyle={errors.passwordCofirm ? { borderColor: Colors.error } : undefined}
              />
            )}
            name="passwordCofirm"
          />
          {errors.passwordCofirm && <Text style={styles.viewTextInput}>{errors?.passwordCofirm?.message}</Text>}
        </View>
        <View style={styles.viewGroup}>
          <View
            style={
              (styleGlobal.justifyContent_flexStart, styleGlobal.alignItems_center, styleGlobal.flexDirection_row)
            }>
            <Text style={styles.viewText}>{t('Bạn đã có tài khoản?')}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.viewButtonRegister}
              onPress={() => NavigationService.navigate(PathName.LOGINSCREEN)}>
              <Text style={styles.viewTextRegister}>{t('Đăng nhập ngay.')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FormAuth>
  );
};

export default React.memo(RegisterScreen);

const styles = StyleSheet.create({
  container: {},
  customs: {
    top: 290,
  },
  viewTextInput: { color: Colors.error, paddingTop: 2 },
  viewGroup: {
    marginTop: 10,
  },
  viewTextRegister: {
    color: Colors.primary,
  },
  viewText: {
    color: Colors.black,
  },
  viewButtonRegister: { marginLeft: 10 },
  viewGender: {
    flex: 1,
  },
  viewAge: { flex: 2 },
});
