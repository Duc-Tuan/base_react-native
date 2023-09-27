import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';

const ScreenCondition = () => {
  return (
    <ActivityPenal title="Điều khoản khi mua hàng">
      <View style={[styleGlobal.marginTop_4, styleGlobal.padding_10, styles.container]}>
        <Text>Các điều khoản sẽ ở trong này</Text>
      </View>
    </ActivityPenal>
  );
};

export default ScreenCondition;

const styles = StyleSheet.create({ container: { backgroundColor: Colors.white, flex: 1 } });
