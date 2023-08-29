/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import { useScrollToTop } from '@react-navigation/native';
import { IconAddress, IconCartV2, IconColor, IconLockChangePass, IconOrder, IconShop } from 'assets/icons';
import ActivityPenal from 'components/ActivityPenal';
import { PathName } from 'configs';
import { useColorPrimary } from 'hooks/useColorPrimary';
import React, { MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heigthFooter } from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import DisplayInfoUser from './components/DisplayInfoUser';
import ItemMenu from './components/ItemMenu';

const SettingScreen = () => {
  const { colorPrimary } = useColorPrimary();
  const { t } = useTranslation();
  const refScrollView = React.useRef<ScrollView>();
  useScrollToTop(refScrollView as any);

  React.useEffect(() => {}, [colorPrimary]);

  const data = React.useMemo(() => {
    return [
      {
        title: '',
        data: [
          { tilte: t('Thông tin cửa hàng'), screen: PathName.INFOSHOPSCREEN, icon: <IconShop fill={colorPrimary} /> },
          { tilte: t('Địa chỉ'), screen: PathName.CHANGEADDRESSSCREEN, icon: <IconAddress fill={colorPrimary} /> },
          { tilte: t('Giỏ hàng'), screen: PathName.CARTSCREEN, icon: <IconCartV2 fill={colorPrimary} /> },
          { tilte: t('Đơn hàng'), screen: PathName.ORDERSCREEN, icon: <IconOrder fill={colorPrimary} /> },
          {
            tilte: t('Đổi mật khẩu'),
            screen: PathName.CHANGEPASSWORDSCREEN,
            icon: <IconLockChangePass fill={colorPrimary} />,
          },
          {
            tilte: t('Đổi màu hệ thống'),
            screen: PathName.CHANGECOLORSYSTEMSCREEN,
            icon: <IconColor fill={colorPrimary} />,
          },
        ],
      },
    ];
  }, [t, colorPrimary]);

  const scrollTo = React.useCallback((value: number) => {
    refScrollView.current?.scrollTo({ animated: true, y: value });
  }, []);

  const styleCustom = [styleGlobal.padding_10, { paddingBottom: 0 }];

  return (
    <ActivityPenal hiddenBack title="Thiết lập">
      <View style={[...styleCustom, styles.viewInfoUser]}>
        <DisplayInfoUser colorPrimary={colorPrimary} />
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
    marginBottom: 14,
  },
  viewBottom: {
    paddingBottom: heigthFooter - 30,
  },
});
