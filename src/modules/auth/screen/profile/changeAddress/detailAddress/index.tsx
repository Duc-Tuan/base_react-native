import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { DetailAddressScreenRouteProp } from 'naviagtion/stack/NavigationRoute';
import { ActivityPenal } from 'components';
import { useTranslation } from 'react-i18next';

interface IProps {
  route?: DetailAddressScreenRouteProp;
}

const DetailAddressScreen: React.FC<IProps> = ({ route: { params } }) => {
  const { t } = useTranslation();
  const { code, default: defaultAddress, item } = params;

  return (
    <ActivityPenal title={`${t('Mã địa chỉ')}: ${code}`}>
      <ScrollView style={styles.container}>
        <View>
          <Text>DetailAddressScreen</Text>
        </View>
      </ScrollView>
    </ActivityPenal>
  );
};

export default React.memo(DetailAddressScreen);

const styles = StyleSheet.create({ container: {} });
