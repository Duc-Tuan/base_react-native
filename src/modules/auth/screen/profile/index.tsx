import { StyleSheet, ScrollView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { ActivityPenal, ButtonCustom } from 'components';
import { IUser } from 'types/auth-types';
import { useForm } from 'react-hook-form';
import { useGetAccount } from 'hooks/useGetAccount';
import ChangeInfoUserScreen from 'modules/auth/screen/profile/changeInfo';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';
import NavigationService from 'naviagtion/stack/NavigationService';
import { ApiAuths } from 'assets/api';
import { useToast } from 'hooks/useToast';
import { useAppDispatch } from 'hooks';
import { actions as actionsAuth } from 'modules/auth/store';

const ProfileScreen = () => {
  const { user } = useGetAccount();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: user,
  });

  React.useEffect(() => {
    setValue('_id', user?._id);
    setValue('code', user?.code);
    setValue('userAdrressDesc', user?.userAdrressDesc);
    setValue('userAge', user?.userAge);
    setValue('userCommune', user?.userCommune);
    setValue('userDistrict', user?.userDistrict);
    setValue('userEmail', user?.userEmail);
    setValue('userGender', user?.userGender);
    setValue('userName', user?.userName);
    setValue('userPhone', user?.userPhone);
    setValue('userProvinceCity', user?.userProvinceCity);
    setValue('userStatus', user?.userStatus);
  }, [user]);

  const onSubmit = React.useCallback(async (data: IUser) => {
    try {
      setLoading(true);
      const res = await ApiAuths.updateInfo(data);
      setLoading(false);
      if (res?.status) {
        dispatch(actionsAuth.update(data));
      }
      return toast(res?.status ? 'success' : 'error', res?.mess);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return (
    <ActivityPenal title="Thông tin cá nhân">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView style={[styleGlobal.marginTop_8]}>
            <View style={[styleGlobal.paddingHorizontal_10, styles.container]}>
              <ChangeInfoUserScreen control={control} errors={errors} />
            </View>
          </ScrollView>

          <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.gap_10, styleGlobal.padding_10]}>
            <ButtonCustom
              styleButton={styleGlobal.flex_1}
              text="Cập nhật"
              action={handleSubmit(onSubmit)}
              disabled={loading}
              typeButton={loading ? 'disabled' : 'main'}
            />
            <ButtonCustom
              styleButton={styleGlobal.flex_1}
              text="Hủy"
              typeButton="outline-main"
              action={NavigationService.goBack}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </ActivityPenal>
  );
};

export default React.memo(ProfileScreen);

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: Colors.white } });
