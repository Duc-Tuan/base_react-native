import { ActivityPenal, ButtonCustom, InputCustom } from 'components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { IChangePassword } from '../../Function';
import NavigationService from 'naviagtion/stack/NavigationService';

const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IChangePassword>({
    defaultValues: {
      passwordOld: '',
      passwordNew: '',
      passwordCofirm: '',
    },
  });

  const onSubmit = React.useCallback((data: IChangePassword) => {
    // console.log(data);
  }, []);

  const isValidPasswordCofirm = React.useCallback(
    (data: string) => {
      if (getValues('passwordNew') !== data) {
        return 'Mật khẩu nhập lại không chính xác.';
      }
      return true;
    },
    [getValues],
  );

  return (
    <ActivityPenal title="Đổi mật khẩu">
      <ScrollView style={[styleGlobal.padding_14, styles.container, styleGlobal.marginTop_10]}>
        <>
          <View>
            <View style={[styles.viewGroup]}>
              <Controller
                control={control}
                rules={{
                  required: t('Vui lòng không để trống trường này.'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCustom
                    placeholder={t('********')}
                    label={t('Mật khẩu cũ:')}
                    close={false}
                    secureTextEntry
                    valueText={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    inputStyle={[styleGlobal.boxshadow, errors.passwordOld ? { borderColor: Colors.error } : undefined]}
                  />
                )}
                name="passwordOld"
              />
              {errors.passwordOld && <Text style={styles.viewTextInput}>{errors.passwordOld.message}</Text>}
            </View>
            <View style={[styles.viewGroup]}>
              <Controller
                control={control}
                rules={{
                  required: t('Vui lòng không để trống trường này.'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCustom
                    placeholder={t('********')}
                    label={t('Mật khẩu mới:')}
                    close={false}
                    secureTextEntry
                    valueText={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    inputStyle={[styleGlobal.boxshadow, errors.passwordNew ? { borderColor: Colors.error } : undefined]}
                  />
                )}
                name="passwordNew"
              />
              {errors.passwordNew && <Text style={styles.viewTextInput}>{errors.passwordNew.message}</Text>}
            </View>
            <View style={[styles.viewGroup]}>
              <Controller
                control={control}
                rules={{
                  required: t('Vui lòng không để trống trường này.'),
                  validate: value => {
                    if (isValidPasswordCofirm(value) === true) {
                      return undefined;
                    }
                    return isValidPasswordCofirm(value);
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputCustom
                    placeholder={t('********')}
                    label={t('Nhập lại mật khẩu:')}
                    close={false}
                    secureTextEntry
                    valueText={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    inputStyle={[
                      styleGlobal.boxshadow,
                      errors.passwordCofirm ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="passwordCofirm"
              />
              {errors.passwordCofirm && <Text style={styles.viewTextInput}>{errors.passwordCofirm.message}</Text>}
            </View>
          </View>

          <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingTop_16]}>
            <ButtonCustom
              text="Hủy"
              typeButton="outline-main"
              styleButton={styleGlobal.flex_1}
              action={NavigationService.goBack}
            />
            <ButtonCustom text="Cập nhật" styleButton={styleGlobal.flex_1} action={handleSubmit(onSubmit)} />
          </View>
        </>
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(ChangePasswordScreen);

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
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
  viewAge: { flex: 2 },
});
