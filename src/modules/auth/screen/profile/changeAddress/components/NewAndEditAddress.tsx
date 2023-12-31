/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityPenal, ButtonCustom, InputCustom, LoadingOverley } from 'components';
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
import { NewAddressScreenRouteProp } from 'naviagtion/stack/NavigationRoute';
import { ApiAddress } from 'assets/api';

const options: IOptions[] = [
  { value: 1, label: 'Hải Dương' },
  { value: 2, label: 'Hà Nội' },
];

interface IProps {
  route: NewAddressScreenRouteProp;
}

const NewAndEditAddress: React.FC<IProps> = ({ route: { params } }) => {
  const { _id } = params;

  const { t } = useTranslation();
  const toast = useToast();
  const [optionsOrganNew, setOptionsOrganNew] = React.useState<IOptions[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [dataLocation, setDataLocation] = React.useState<ILocation>();

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

  const getAddressOrder = React.useCallback(
    async (id?: string | number) => {
      setLoading(true);
      const dataAddress = await ApiAddress.getDetailAddressOrder(id);
      setDataLocation(dataAddress);
      setLoading(false);

      setValue('addressNameReceiver', dataAddress?.addressNameReceiver);
      setValue('addressPhoneReceive', dataAddress?.addressPhoneReceive);
      setValue('addressTimeReceive', dataAddress?.addressTimeReceive);
      setValue('addressOrganReceive', dataAddress?.addressOrganReceive);
      setValue('addressDetail', dataAddress?.addressDetail);
      setValue('addressDefault', dataAddress?.addressDefault);

      setValue('addressCity', dataAddress?.addressCity);
      setValue('addressDistrict', dataAddress?.addressDistrict);
      setValue('addressVillage', dataAddress?.addressVillage);
      setValue('addressWards', dataAddress?.addressWards);
    },
    [_id],
  );

  React.useEffect(() => {
    if (_id) {
      getAddressOrder(_id);
    }
  }, [_id]);

  const onSubmit = React.useCallback(async (data: ILocation) => {
    try {
      setLoading(true);
      let putData;
      if (_id) {
        putData = await ApiAddressOrder.editAddressOrder(_id, data);
      } else {
        putData = await ApiAddressOrder.createAddressOrder(data);
      }
      setLoading(false);
      if (putData?.status) {
        toast('success', putData?.mess);
        NavigationService.replace(PathName.CHANGEADDRESSSCREEN);
      }
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
    <ActivityPenal
      title={_id ? `${t('Sửa địa chỉ')} ${dataLocation?.code ?? 'Đang cập nhật...'}` : 'Thêm địa chỉ mới'}
      isLoading={loading}>
      <ScrollView style={[styleGlobal.padding_14, styles.container, styleGlobal.marginTop_10]}>
        <View style={[styleGlobal.paddingBottom_16]}>
          <View>
            <Controller
              control={control}
              rules={{
                required: t('Vui lòng không để trống trường này.'),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputCustom
                  required
                  placeholder="Phạm Đức Tuấn"
                  label={'Tên người nhận:'}
                  close={false}
                  valueText={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  inputStyle={[
                    styleGlobal.boxshadow,
                    styleGlobal.lv1,
                    errors.addressNameReceiver ? { borderColor: Colors.error } : undefined,
                  ]}
                />
              )}
              name="addressNameReceiver"
            />
            {errors.addressNameReceiver && (
              <Text style={styles.viewTextInput}>{errors.addressNameReceiver.message}</Text>
            )}
          </View>

          <View style={styleGlobal.marginTop_10}>
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
                  type="phone-pad"
                  placeholder="098765xxxx"
                  label={'Số điện thoại:'}
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
                  placeholder="Từ thứ 2 đến thứ 6..."
                  label="Thời gian nhận hàng:"
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
                  initalValue={_id ? value : undefined}
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
                    initalValue={_id ? value : undefined}
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
                    initalValue={_id ? value : undefined}
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
                    initalValue={_id ? value : undefined}
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
                    initalValue={_id ? value : undefined}
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
                  placeholder="Số nhà xxx, phố xxx, ..."
                  label="Địa chỉ chi tiết:"
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
            <CheckBox
              textRight="Chọn làm địa chỉ mặc định."
              onChange={handelAddressDefault}
              value={watch('addressDefault')}
            />
          </View>
        </View>
      </ScrollView>
      <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.padding_10]}>
        <ButtonCustom
          text="Hủy"
          typeButton="outline-main"
          styleButton={styleGlobal.flex_1}
          action={NavigationService.goBack}
        />
        <ButtonCustom
          text={_id ? 'Cập nhật' : 'Thêm mới'}
          styleButton={styleGlobal.flex_1}
          action={handleSubmit(onSubmit)}
          disabled={loading}
          typeButton={!loading ? 'main' : 'disabled'}
        />
      </View>
    </ActivityPenal>
  );
};

export default NewAndEditAddress;

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
  viewTextInput: { color: Colors.error, paddingTop: 2 },
});
