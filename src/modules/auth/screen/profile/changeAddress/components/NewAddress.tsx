/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityPenal, ButtonCustom, InputCustom } from 'components';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';
import { Controller, useForm } from 'react-hook-form';
import { ILocation, optionsOrgan } from 'assets/data';
import NavigationService from 'naviagtion/stack/NavigationService';
import SelectCustom from 'components/custom/Selected/SelectCustom';
import { IOptions } from 'types/product-types';
import { isValidPhone } from 'utils/genal';
import CheckBox from 'components/custom/CheckBox';
import ApiAddressOrder from 'assets/api/ApiAddress';
import { PathName } from 'configs';
import { useToast } from 'hooks/useToast';

const options: IOptions[] = [
  { value: 1, label: 'Hải Dương' },
  { value: 2, label: 'Hà Nội' },
];

const NewAddressScreen = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [optionsOrganNew, setOptionsOrganNew] = React.useState<IOptions[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

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
  } = useForm<ILocation>({
    defaultValues: {
      addressOrganReceive: '',
      addressPhoneReceive: '',
      addressTimeReceive: '',
      addressDetail: '',
      addressWards: '',
      addressVillage: '',
      addressDistrict: '',
      addressCity: '',
      addressDefault: false,
    },
  });

  const onSubmit = React.useCallback(async (data: ILocation) => {
    try {
      setLoading(true);
      const putData = await ApiAddressOrder.createAddressOrder(data);
      toast('success', putData?.mess);
      setLoading(false);
      NavigationService.replace(PathName.CHANGEADDRESSSCREEN);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    switch (watch('addressOrganReceive')) {
      case t('Nhà riêng'):
        setValue('addressTimeReceive', t('Lúc nào cũng có người nhận.'));
        break;
      case t('Công ty'):
        setValue('addressTimeReceive', t('Từ thứ 2 - thứ 6, 8h00 - 17h30 hàng tuần'));
        break;
      case t('Khác'):
        setValue('addressTimeReceive', t('Thoải mái, đến là đón'));
        break;
      default:
        setValue('addressTimeReceive', '');
    }
  }, [watch('addressOrganReceive'), t]);

  const handelAddressDefault = React.useCallback((data: boolean) => {
    setValue('addressDefault', data);
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
                    errors.addressPhoneReceive ? { borderColor: Colors.error } : undefined,
                  ]}
                />
              )}
              name="addressPhoneReceive"
            />
            {errors.addressPhoneReceive && (
              <Text style={styles.viewTextInput}>{errors.addressPhoneReceive.message}</Text>
            )}
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
              name="addressTimeReceive"
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
                    errors.addressOrganReceive ? { borderColor: Colors.error } : undefined,
                  ]}
                />
              )}
              name="addressOrganReceive"
            />
            {errors.addressOrganReceive && (
              <Text style={styles.viewTextInput}>{errors.addressOrganReceive.message}</Text>
            )}
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
                      errors.addressVillage ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="addressVillage"
              />
              {errors.addressVillage && <Text style={styles.viewTextInput}>{errors.addressVillage.message}</Text>}
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
                      errors.addressDistrict ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="addressDistrict"
              />
              {errors.addressDistrict && <Text style={styles.viewTextInput}>{errors.addressDistrict.message}</Text>}
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
                      errors.addressWards ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="addressWards"
              />
              {errors.addressWards && <Text style={styles.viewTextInput}>{errors.addressWards.message}</Text>}
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
                      errors.addressCity ? { borderColor: Colors.error } : undefined,
                    ]}
                  />
                )}
                name="addressCity"
              />
              {errors.addressCity && <Text style={styles.viewTextInput}>{errors.addressCity.message}</Text>}
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
            <CheckBox textRight="Chọn làm địa chỉ mặc định." onChange={handelAddressDefault} />
          </View>
        </View>

        <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.paddingTop_16]}>
          <ButtonCustom
            text="Hủy"
            typeButton="outline-main"
            styleButton={styleGlobal.flex_1}
            action={NavigationService.goBack}
          />
          <ButtonCustom
            text="Thêm mới"
            styleButton={styleGlobal.flex_1}
            action={handleSubmit(onSubmit)}
            disabled={loading}
            typeButton={!loading ? 'main' : 'disabled'}
          />
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
