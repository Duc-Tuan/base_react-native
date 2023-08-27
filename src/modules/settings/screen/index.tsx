/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import ActivityPenal from 'components/ActivityPenal';
import { heigthFooter } from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { useTranslation } from 'react-i18next';
import { IconShop } from 'assets/icons';

const SettingScreen = () => {
  console.log('setting...');
  const { t } = useTranslation();
  const data = React.useMemo(
    () => [
      {
        title: '',
        data: [{ tilte: t('Thông tin shop'), screen: 'CustomersScreen', icon: <IconShop /> }],
      },
    ],
    [t],
  );
  return (
    <ActivityPenal styleChildren={styles.container} hiddenBack title="Thiết lập">
      <View>
        <Text>SettingScreen...</Text>
      </View>
      <ScrollView>
        <View style={[styleGlobal.padding_10, styles.viewBottom]}>
          <Text>SettingScreen...</Text>
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(SettingScreen);

const styles = StyleSheet.create({
  container: {},
  viewBottom: {
    paddingBottom: heigthFooter - 30,
  },
});
