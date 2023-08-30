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

const LoginScreen = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    defaultValues: {
      useName: '',
      password: '',
    },
  });

  const onSubmit = (data: IFormLogin) => {
    console.log(data);
    return NavigationService.navigate(PathName.HOMESCREEN);
  };

  return (
    <FormAuth title="Đăng nhập" active={handleSubmit(onSubmit)} titleActive="Đăng nhập">
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
                inputStyle={errors.useName ? { borderColor: Colors.error } : undefined}
              />
            )}
            name="useName"
          />
          {errors.useName && <Text style={styles.viewTextInput}>{errors.useName.message}</Text>}
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
          <CheckBox textRight="Lưu mật khẩu." />
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
