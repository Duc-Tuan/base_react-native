import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IUser } from 'types/auth-types';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import Colors from 'themes/Color';
import { InputCustom } from 'components';
import { useTranslation } from 'react-i18next';
import { styleGlobal } from 'types/StyleGlobal';
import SelectCustom from 'components/custom/Selected/SelectCustom';
import { options, optionsGender } from './const';
import SelectorDate from 'components/custom/SelectorDate';

interface IProps {
  control: Control<IUser, any>;
  errors: FieldErrors<IUser>;
}

const ChangeInfoUserScreen: React.FC<IProps> = ({ control, errors }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, styleGlobal.marginBottom_14]}>
      <View style={[styles.viewGroup]}>
        <Controller
          control={control}
          rules={{
            required: t('Vui lòng không để trống.'),
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <InputCustom
                placeholder={'Mr.abc...'}
                label={'Họ tên:'}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
                inputStyle={errors.userNickname ? { borderColor: Colors.error } : undefined}
              />
            );
          }}
          name="userNickname"
        />
        {errors.userNickname && <Text style={styles.viewTextInput}>{errors.userNickname.message}</Text>}
      </View>

      <View style={[styles.viewGroup]}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <InputCustom
                disabled
                placeholder={'abc...'}
                label={'Tài khoản:'}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            );
          }}
          name="userName"
        />
      </View>

      <View style={[styles.viewGroup]}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <InputCustom
                disabled
                placeholder={'abcde@gmail.com, ...@yahoo.com, ....'}
                label={'Email: '}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            );
          }}
          name="userEmail"
        />
      </View>

      <View
        style={[
          styles.viewGroup,
          styleGlobal.dflex_spaceBetween,
          styleGlobal.alignItems_flexStart,
          styleGlobal.zIndex_lv4,
        ]}>
        <View style={styleGlobal.flex_1}>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống.'),
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <InputCustom
                  disabled
                  placeholder={'USxxxxx'}
                  label={'Mã code:'}
                  close={false}
                  valueText={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  inputStyle={errors.code ? { borderColor: Colors.error } : undefined}
                />
              );
            }}
            name="code"
          />
          {errors.code && <Text style={styles.viewTextInput}>{errors.code.message}</Text>}
        </View>

        <View style={[styleGlobal.flex_2]}>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống.'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectCustom
                required
                onChange={onChange}
                options={optionsGender}
                label="Giới tính:"
                initalValue={value}
                styleWrapper={[
                  styleGlobal.boxshadow,
                  styleGlobal.lv1,
                  errors.userGender ? { borderColor: Colors.error } : undefined,
                ]}
              />
            )}
            name="userGender"
          />
          {errors.userGender && <Text style={styles.viewTextInput}>{errors.userGender.message}</Text>}
        </View>
      </View>

      <View
        style={[
          styles.viewGroup,
          styleGlobal.dflex_spaceBetween,
          styleGlobal.alignItems_flexStart,
          styleGlobal.zIndex_lv3,
        ]}>
        <View style={styleGlobal.flex_1}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return <SelectorDate label="Ngày sinh:" value={value} onChange={onChange} />;
            }}
            name="userAge"
          />
        </View>

        <View style={styleGlobal.flex_1}>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống.'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectCustom
                required
                initalValue={value}
                onChange={onChange}
                options={options}
                label="Tỉnh/ Thành phố: "
                styleWrapper={[
                  styleGlobal.boxshadow,
                  styleGlobal.lv1,
                  errors.userProvinceCity ? { borderColor: Colors.error } : undefined,
                ]}
              />
            )}
            name="userProvinceCity"
          />
          {errors.userProvinceCity && <Text style={styles.viewTextInput}>{errors.userProvinceCity.message}</Text>}
        </View>
      </View>

      <View
        style={[
          styles.viewGroup,
          styleGlobal.dflex_spaceBetween,
          styleGlobal.alignItems_flexStart,
          styleGlobal.zIndex_lv2,
        ]}>
        <View style={styleGlobal.flex_1}>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống.'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectCustom
                required
                initalValue={value}
                onChange={onChange}
                options={options}
                label="Quận/ Huyện: "
                styleWrapper={[
                  styleGlobal.boxshadow,
                  styleGlobal.lv1,
                  errors.userDistrict ? { borderColor: Colors.error } : undefined,
                ]}
              />
            )}
            name="userDistrict"
          />
          {errors.userDistrict && <Text style={styles.viewTextInput}>{errors.userDistrict.message}</Text>}
        </View>

        <View style={styleGlobal.flex_1}>
          <Controller
            control={control}
            rules={{
              required: t('Vui lòng không để trống.'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectCustom
                required
                initalValue={value}
                onChange={onChange}
                options={options}
                label="Xã/ Phường: "
                styleWrapper={[
                  styleGlobal.boxshadow,
                  styleGlobal.lv1,
                  errors.userCommune ? { borderColor: Colors.error } : undefined,
                ]}
              />
            )}
            name="userCommune"
          />
          {errors.userCommune && <Text style={styles.viewTextInput}>{errors.userCommune.message}</Text>}
        </View>
      </View>

      <View style={[styles.viewGroup]}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <InputCustom
                placeholder={'098765xxxx'}
                label={'Số điện thoại:'}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            );
          }}
          name="userPhone"
        />
      </View>

      <View style={[styles.viewGroup]}>
        <Controller
          control={control}
          rules={{
            required: t('Vui lòng không để trống.'),
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <InputCustom
                required
                placeholder={'Số nhà xxx, phố xxx, ...'}
                label={'Địa chỉ chi tiết:'}
                close={false}
                valueText={value}
                onBlur={onBlur}
                onChange={onChange}
                inputStyle={errors.userAdrressDesc ? { borderColor: Colors.error } : undefined}
              />
            );
          }}
          name="userAdrressDesc"
        />
        {errors.userAdrressDesc && <Text style={styles.viewTextInput}>{errors.userAdrressDesc.message}</Text>}
      </View>
    </View>
  );
};

export default React.memo(ChangeInfoUserScreen);

const styles = StyleSheet.create({
  container: {},
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
});
