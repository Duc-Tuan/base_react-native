import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FormAuth from './FormAuth';
import { Controller, useForm } from 'react-hook-form';
import { IRestPassword } from './Function';
import { InputCustom } from 'components';
import Colors from 'themes/Color';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from 'utils/genal';
import { styleGlobal } from 'types/StyleGlobal';
import { ApiAuths } from 'assets/api';
import { useToast } from 'hooks/useToast';
import NavigationService from 'naviagtion/stack/NavigationService';
import { PathName } from 'configs';
import { hexToRgba } from 'utils';

const dataReset: IRestPassword = {
  id: undefined,
  code: undefined,
  email: undefined,
  usename: undefined,
  passwordNew: undefined,
  passwordConfirm: undefined,
};

const dataStatus: string[] = ['Thông tin', 'Nhập mã', 'Đổi mật khẩu'];

const ScreenResetPassword = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string[]>(['Thông tin']);
  const [data, setData] = React.useState<{ id?: string; password?: boolean }>({
    id: undefined,
    password: undefined,
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IRestPassword>({
    defaultValues: dataReset,
  });

  const onSubmit = React.useCallback(async (i: IRestPassword) => {
    try {
      setLoading(true);
      const res = await ApiAuths.restPassword(i);
      setLoading(false);
      if (res?.status) {
        setValue('email', dataReset?.email);
        setValue('usename', dataReset?.usename);
        if (res?.id) {
          setStatus(prev => [...prev, 'Nhập mã']);
          setValue('id', res?.id);
          setData(prev => ({ ...prev, id: res?.id }));
        } else if (res?.password) {
          setValue('code', dataReset?.code);
          setStatus(prev => [...prev, 'Đổi mật khẩu']);
          return setData({
            id: undefined,
            password: res?.password,
          });
        } else if (res?.navigate) {
          NavigationService.navigate(PathName.LOGINSCREEN);
        }
        return toast('success', res?.mess);
      }
      return toast('error', res?.mess);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const isValidPasswordCofirm = React.useCallback((data?: string) => {
    if (getValues('passwordNew') !== data) {
      return 'Mật khẩu nhập lại không chính xác.';
    }
    return true;
  }, []);

  return (
    <FormAuth
      loading={loading}
      title="Lấy lại mật khẩu"
      active={handleSubmit(onSubmit)}
      titleActive={data?.password ? 'Cập nhật' : 'Gửi'}
      stylesWrapper={styles.stylesWrapper}
      stylesTitle={styles.container}>
      <>
        <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10, { marginBottom: 40 }]}>
          {dataStatus?.map((i: string, idx: number) => {
            const isCheck = status?.some((d: string) => d === i);
            return (
              <View key={idx} style={[styleGlobal.dFlex_center, { gap: 4, position: 'relative' }]}>
                <View
                  style={[
                    styles.ViewCir,
                    { backgroundColor: isCheck ? Colors.primary : hexToRgba(Colors.primary, 0.2) },
                  ]}
                />
                <Text
                  style={[
                    styles.ViewTextStatus,
                    {
                      color: isCheck ? Colors.primary : hexToRgba(Colors.primary, 0.2),
                      fontWeight: isCheck ? '700' : '400',
                    },
                  ]}>
                  {t(i)}
                </Text>
                <View
                  style={[
                    styles.ViewSeparation,
                    { backgroundColor: isCheck ? Colors.primary : hexToRgba(Colors.primary, 0.2) },
                  ]}
                />
              </View>
            );
          })}
        </View>

        <View style={styleGlobal.marginBottom_10}>
          {data?.id ? (
            <>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: t('Vui lòng không để trống trường này.'),
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputCustom
                      placeholder={'00000'}
                      label={'Mã code:'}
                      close={false}
                      type="phone-pad"
                      valueText={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputStyle={errors.code ? { borderColor: Colors.error } : undefined}
                    />
                  )}
                  name="code"
                />
                {errors.code && <Text style={styles.viewTextInput}>{errors.code.message}</Text>}
              </View>
            </>
          ) : data?.password ? (
            <>
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
                      label={'Mật khẩu:'}
                      close={false}
                      valueText={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputStyle={errors.passwordNew ? { borderColor: Colors.error } : undefined}
                    />
                  )}
                  name="passwordNew"
                />
                {errors.passwordNew && <Text style={styles.viewTextInput}>{errors.passwordNew.message}</Text>}
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
                      label={'Nhập lại mật khẩu:'}
                      close={false}
                      valueText={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputStyle={errors.passwordConfirm ? { borderColor: Colors.error } : undefined}
                    />
                  )}
                  name="passwordConfirm"
                />
                {errors.passwordConfirm && <Text style={styles.viewTextInput}>{errors?.passwordConfirm?.message}</Text>}
              </View>
            </>
          ) : (
            <>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: t('Vui lòng không để trống trường này.'),
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputCustom
                      placeholder={'abc...'}
                      label={'Tài khoản:'}
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
                    validate: value => {
                      if (isValidEmail(value) === true) return undefined;
                      return isValidEmail(value);
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputCustom
                      placeholder={'email@gmail.com, email@yahoo.com, ...'}
                      label={'Email: '}
                      close={false}
                      valueText={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      inputStyle={errors.email ? { borderColor: Colors.error } : undefined}
                    />
                  )}
                  name="email"
                />
                {errors.email && <Text style={styles.viewTextInput}>{errors.email.message}</Text>}
              </View>
            </>
          )}
        </View>
      </>
    </FormAuth>
  );
};

export default ScreenResetPassword;

const styles = StyleSheet.create({
  container: { left: 160 },
  viewGroup: {
    marginTop: 16,
  },
  viewTextInput: { color: Colors.error, paddingTop: 2 },
  ViewTextStatus: {
    position: 'absolute',
    top: 14,
    left: 0,
  },
  ViewCir: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  ViewSeparation: {
    width: 80,
    height: 2,
  },
  stylesWrapper: {
    top: 320,
  },
});
