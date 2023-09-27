/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import { useScrollToTop } from '@react-navigation/native';
import {
  IconAddress,
  IconCartV2,
  IconColor,
  IconCondition,
  IconLockChangePass,
  IconOrder,
  IconShop,
} from 'assets/icons';
import ActivityPenal from 'components/ActivityPenal';
import { PathName } from 'configs';
import { useColorPrimary } from 'hooks/useColorPrimary';
import { useGetAccount } from 'hooks/useGetAccount';
import React, { MutableRefObject } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heigthFooter } from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';
import DisplayInfoUser from './components/DisplayInfoUser';
import ItemMenu from './components/ItemMenu';

const SettingScreen = () => {
  const { colorPrimary } = useColorPrimary();
  const refScrollView = React.useRef<ScrollView>();
  useScrollToTop(refScrollView as any);
  const { user, isLogin } = useGetAccount();

  React.useEffect(() => {}, [colorPrimary]);

  const data = React.useMemo(() => {
    return [
      {
        title: '',
        data: [
          {
            tilte: 'Thông tin cửa hàng',
            screen: PathName.INFOSHOPSCREEN,
            icon: <IconShop fill={colorPrimary} />,
          },
          {
            tilte: 'Địa chỉ',
            screen: PathName.CHANGEADDRESSSCREEN,
            isLogin,
            icon: <IconAddress fill={isLogin ? colorPrimary : hexToRgba(colorPrimary, 0.6)} />,
          },
          {
            tilte: 'Giỏ hàng',
            screen: PathName.CARTSCREEN,
            icon: <IconCartV2 fill={colorPrimary} />,
          },
          {
            tilte: 'Đơn hàng',
            screen: PathName.ORDERSCREEN,
            isLogin,
            icon: <IconOrder fill={isLogin ? colorPrimary : hexToRgba(colorPrimary, 0.6)} />,
          },
          {
            tilte: 'Đổi mật khẩu',
            screen: PathName.CHANGEPASSWORDSCREEN,
            isLogin,
            icon: <IconLockChangePass fill={isLogin ? colorPrimary : hexToRgba(colorPrimary, 0.6)} />,
          },
          {
            tilte: 'Đổi màu hệ thống',
            screen: PathName.CHANGECOLORSYSTEMSCREEN,
            icon: <IconColor fill={colorPrimary} />,
          },
          {
            tilte: 'Điều khoản mua hàng',
            screen: PathName.CONDITIONSCREEN,
            icon: <IconCondition />,
          },
        ],
      },
    ];
  }, [colorPrimary, isLogin]);

  const scrollTo = React.useCallback((value: number) => {
    refScrollView.current?.scrollTo({ animated: true, y: value });
  }, []);

  const styleCustom = [styleGlobal.padding_10, { paddingBottom: 0 }];

  return (
    <ActivityPenal hiddenBack title="Thiết lập">
      <View style={[...styleCustom, styles.viewInfoUser]}>
        <DisplayInfoUser colorPrimary={colorPrimary} user={user} isLogin={isLogin} />
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
