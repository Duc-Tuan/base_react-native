/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import { IconAddress, IconColor, IconLockChangePass, IconOrder, IconShop } from 'assets/icons';
import ActivityPenal from 'components/ActivityPenal';
import React, { MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors, { heigthFooter } from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import DisplayInfoUser from './components/DisplayInfoUser';
import ItemMenu from './components/ItemMenu';
import { useScrollToTop } from '@react-navigation/native';
import { PathName } from 'configs';

const SettingScreen = () => {
  console.log('setting...');
  const { t } = useTranslation();
  const refScrollView = React.useRef<ScrollView>();
  useScrollToTop(refScrollView as any);

  const data = React.useMemo(
    () => [
      {
        title: '',
        data: [
          { tilte: t('Thông tin shop'), screen: PathName.INFOSHOPCREEN, icon: <IconShop fill={Colors.primary} /> },
          { tilte: t('Đơn hàng'), screen: PathName.ORDERCREEN, icon: <IconOrder fill={Colors.primary} /> },
          { tilte: t('Địa chỉ'), screen: PathName.CHANGEADDRESSCREEN, icon: <IconAddress fill={Colors.primary} /> },
          {
            tilte: t('Đổi mật khẩu'),
            screen: PathName.CHANGEPASSWORDCREEN,
            icon: <IconLockChangePass fill={Colors.primary} />,
          },
          {
            tilte: t('Đổi màu hệ thống'),
            screen: PathName.CHANGECOLORSYSTEMCREEN,
            icon: <IconColor fill={Colors.primary} />,
          },
        ],
      },
    ],
    [t],
  );

  const scrollTo = React.useCallback((value: number) => {
    refScrollView.current?.scrollTo({ animated: true, y: value });
  }, []);

  const styleCustom = [styleGlobal.padding_10, { paddingBottom: 0 }];

  return (
    <ActivityPenal hiddenBack title="Thiết lập">
      <View style={[...styleCustom, styles.viewInfoUser]}>
        <DisplayInfoUser />
      </View>
      <ScrollView ref={refScrollView as MutableRefObject<ScrollView>} style={styleCustom}>
        <View style={styles.viewScroll}>
          {data.map((i: any, idx: number) => {
            return <ItemMenu key={idx} item={i} scrollTo={scrollTo} />;
          })}
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(SettingScreen);

const styles = StyleSheet.create({
  viewScroll: {
    paddingBottom: 40,
  },
  viewInfoUser: {
    marginBottom: 20,
  },
  viewBottom: {
    paddingBottom: heigthFooter - 30,
  },
});
