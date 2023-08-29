import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityPenal } from 'components';

const ProfileScreen = () => {
  return (
    <ActivityPenal title="Thông tin cá nhân">
      <View style={styles.container}>
        <Text>info User</Text>
      </View>
    </ActivityPenal>
  );
};

export default React.memo(ProfileScreen);

const styles = StyleSheet.create({ container: {} });
