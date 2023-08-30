/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityPenal, ButtonCustom, InputCustom } from 'components';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';
import { Controller, useForm } from 'react-hook-form';
import { ILocationDetail, optionsOrgan } from 'assets/data';
import NavigationService from 'naviagtion/stack/NavigationService';
import SelectCustom from 'components/custom/Selected/SelectCustom';
import { IOptions } from 'types/product-types';
import { isValidPhone } from 'utils/genal';
import CheckBox from 'components/custom/CheckBox';

const options: IOptions[] = [
  { value: 1, label: 'Hải Dương' },
  { value: 2, label: 'Hà Nội' },
];

const NewAddressScreen = () => {
  const { t } = useTranslation();
  const [optionsOrganNew, setOptionsOrganNew] = React.useState<IOptions[]>([]);

  React.useEffect(() => {
    const dataNew = optionsOrgan?.map((i: IOptions) => ({ value: i.value, label: t(String(i.label)) }));
    setOptionsOrganNew([...dataNew]);
  }, [t, optionsOrgan]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ILocationDetail>({
    defaultValues: {
      Wards: '',
      District: '',
      village: '',
      city: '',
      addressDetail: '',
      phone: '',
      organ: '',
      deliveryTime: '',
      default: false,
    },
  });

  const onSubmit = React.useCallback((data: ILocationDetail) => {
    console.log(data);
  }, []);

  React.useEffect(() => {
    switch (watch('organ')) {
      case t('Nhà riêng'):
        setValue('deliveryTime', t('Lúc nào cũng có người nhận.'));
        break;
      case t('Công ty'):
        setValue('deliveryTime', t('Từ thứ 2 - thứ 6, 8h00 - 17h30 hàng tuần'));
        break;
      case t('Khác'):
        setValue('deliveryTime', t('Thoải mái, đến là đón'));
        break;
      default:
        setValue('deliveryTime', '');
    }
  }, [watch('organ'), t]);

  const handelAddressDefault = React.useCallback((data: boolean) => {
    setValue('default', data);
  }, []);

  return (
    <ActivityPenal title="Thêm địa chỉ mới">
      <ScrollView style={[styleGlobal.padding_14, styles.container, styleGlobal.marginTop_10]}>
        <View>
          <View>
            <Controller
              control={control}
              rules={{
                required: t('Vui lòng không để trống trường này.'),
                validate: value => {
                  if (isValidPhone(value) === true) {
                    return undefined;
                  }
                  return t('Số điện thoại không đúng định dạng.');
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputCustom
                  required
                  type="number-pad"
                  placeholder={t('Nhập số điện thoại...')}
                  label={t('Số điện thoại:')}
                  close={false}
                  valueText={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  inputStyle={[
                    styleGlobal.boxshadow,
                    styleGlobal.lv1,
                    errors.phone ? { borderColor: Colors.error } : undefined,
                  ]}
                />
              )}
              name="phone"
            />
            {errors.phone && <Text style={styles.viewTextInput}>{errors.phone.message}</Text>}
          </View>

          <View style={styleGlobal.marginTop_10}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputCustom
                  placeholder={t('Nhập thời gian nhận hàng...')}
                  label={t('Thời gian nhận hàng:')}
                  close={false}
                  valueText={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  inputStyle={[styleGlobal.boxshadow, styleGlobal.lv1]}
                />
              )}
              name="deliveryTime"
            />
          </View>

          <View style={[styleGlobal.zIndex_lv4, styleGlobal.marginTop_10]}>
            <Controller
              control={control}
              rules={{
                required: t('Vui lòng không để trống trường này.'),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectCustom
                  required
                  onChange={onChange}
                  options={optionsOrganNew}
                  label="Cơ quan:"
                  styleWrapper={[
                    styleGlobal.boxshadow,
                    styleGlobal.lv1,
                    errors.organ ? { borderColor: Colors.error } : undefined,
                  ]}
                />
              )}
              name="organ"
            />
            {errors.organ && <Text style={styles.viewTextInput}>{errors.organ.message}</Text>}
          </View>

          <View
            style={[
              styleGlobal.dFlex_center,
              styleGlobal.alignItems_flexStart,
              styleGlobal.marginTop_10,
              styleGlobal.zIndex_lv3,
              styleGlobal.gap_10,
            ]}>
            <View style={styleGlobal.flex_1}>
              <Controller
                control={control}
                rules={{
                  required: t('Vui lòng không để trống trường này.'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectCustom
                    required
                    onChange={onChange}
                    options={options}
                    label="Tổ\Thôn: "
                    styleWrapper={[
                      styleGlobal.boxshadow,
                      styleGlobal.lv1,
                      errors.village ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="village"
              />
              {errors.village && <Text style={styles.viewTextInput}>{errors.village.message}</Text>}
            </View>
            <View style={styleGlobal.flex_1}>
              <Controller
                control={control}
                rules={{
                  required: t('Vui lòng không để trống trường này.'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectCustom
                    required
                    onChange={onChange}
                    options={options}
                    label="Quận/Huyện: "
                    styleWrapper={[
                      styleGlobal.boxshadow,
                      styleGlobal.lv1,
                      errors.District ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="District"
              />
              {errors.District && <Text style={styles.viewTextInput}>{errors.District.message}</Text>}
            </View>
          </View>

          <View
            style={[
              styleGlobal.dFlex_center,
              styleGlobal.alignItems_flexStart,
              styleGlobal.marginTop_10,
              styleGlobal.zIndex_lv2,
              styleGlobal.gap_10,
            ]}>
            <View style={styleGlobal.flex_1}>
              <Controller
                control={control}
                rules={{
                  required: t('Vui lòng không để trống trường này.'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectCustom
                    required
                    onChange={onChange}
                    options={options}
                    label="Xã/Phường: "
                    styleWrapper={[
                      styleGlobal.boxshadow,
                      styleGlobal.lv1,
                      errors.Wards ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="Wards"
              />
              {errors.Wards && <Text style={styles.viewTextInput}>{errors.Wards.message}</Text>}
            </View>
            <View style={styleGlobal.flex_1}>
              <Controller
                control={control}
                rules={{
                  required: t('Vui lòng không để trống trường này.'),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectCustom
                    required
                    onChange={onChange}
                    options={options}
                    label="Tỉnh/Thành phố:"
                    styleWrapper={[
                      styleGlobal.boxshadow,
                      styleGlobal.lv1,
                      errors.city ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="city"
              />
              {errors.city && <Text style={styles.viewTextInput}>{errors.city.message}</Text>}
            </View>
          </View>

          <View style={[styleGlobal.marginTop_10, styleGlobal.zIndex_lv1]}>
            <Controller
              control={control}
              rules={{
                required: t('Vui lòng không để trống trường này.'),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputCustom
                  required
                  placeholder={t('Nhập địa chỉ chi tiết...')}
                  label={t('Địa chỉ chi tiết:')}
                  close={false}
                  valueText={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  inputStyle={[
                    styleGlobal.boxshadow,
                    styleGlobal.lv1,
                    errors.addressDetail ? { borderColor: Colors.error } : undefined,
                  ]}
                />
              )}
              name="addressDetail"
            />
            {errors.addressDetail && <Text style={styles.viewTextInput}>{errors.addressDetail.message}</Text>}
          </View>

          <View style={[styleGlobal.marginTop_10, styleGlobal.zIndex_lv1]}>
            <CheckBox textRight="Chọn làm địa chỉ mặc định" onChange={handelAddressDefault} />
          </View>
        </View>

        <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingTop_16]}>
          <ButtonCustom
            text="Hủy"
            typeButton="outline-main"
            styleButton={styleGlobal.flex_1}
            action={NavigationService.goBack}
          />
          <ButtonCustom text="Thêm mới" styleButton={styleGlobal.flex_1} action={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default NewAddressScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
  viewTextInput: { color: Colors.error, paddingTop: 2 },
});
