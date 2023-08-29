/* eslint-disable dot-notation */
import { IconCheck } from 'assets/icons';
import { ActivityPenal, ButtonCustom } from 'components';
import { PathName } from 'configs';
import { useAppDispatch } from 'hooks';
import { useColorPrimary } from 'hooks/useColorPrimary';
import { actions as ActionSetting } from 'modules/settings/store';
import NavigationService from 'naviagtion/stack/NavigationService';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors, { ColorsSelect } from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';

const dataColor = [
  ColorsSelect['Violet'],
  ColorsSelect['blue'],
  ColorsSelect['lightGray'],
  ColorsSelect['pick'],
  ColorsSelect['primary'],
];

const ChangeColorSystemScreen = () => {
  const { colorPrimary } = useColorPrimary();
  const [colorSystem, setColorSytem] = React.useState<string>(colorPrimary || Colors.primary);
  const dispatch = useAppDispatch();

  const handleSubmit = React.useCallback(async () => {
    try {
      if (colorSystem !== colorPrimary) {
        await dispatch(ActionSetting.setColor({ colorPrimary: colorSystem }));
        NavigationService.navigate(PathName.SPLASHSCREEN);
      }
    } catch (error) {
    } finally {
    }
  }, [colorSystem, colorPrimary, dispatch]);

  return (
    <ActivityPenal styleChildren={[styleGlobal.padding_10, styles.container]} title="Đổi màu hệ thống">
      <View style={[styleGlobal.padding_10, styleGlobal.border, styleGlobal.dflex_spaceBetween, styles.viewMain]}>
        {dataColor?.map((i: string, idx: number) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.9}
            style={[styleGlobal.dFlex_center, styles.viewColor, { backgroundColor: i }]}
            onPress={() => setColorSytem(i)}>
            {i === colorSystem && <IconCheck fill={Colors.white} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.padding_10, styles.viewFooter]}>
        <ButtonCustom
          styleButton={styles.viewButton}
          text="Hủy"
          typeButton="outline-main"
          action={NavigationService.goBack}
        />
        <ButtonCustom styleButton={styles.viewButton} text="Áp dụng" action={handleSubmit} />
      </View>
    </ActivityPenal>
  );
};

export default React.memo(ChangeColorSystemScreen);

const styles = StyleSheet.create({
  container: {},
  viewColor: { width: 40, height: 40, borderRadius: 6 },
  viewMain: { backgroundColor: Colors.white, borderRadius: 10, minHeight: 200, justifyContent: 'space-evenly' },
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
  },
  viewButton: {
    width: '48%',
  },
});
