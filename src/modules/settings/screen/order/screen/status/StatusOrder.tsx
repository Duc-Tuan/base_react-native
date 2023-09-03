import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

const StatusOrder = () => {
  const { t } = useTranslation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>StatusOrder aaa</Text>
      </View>
    </ScrollView>
  );
};

export default StatusOrder;

const styles = StyleSheet.create({ container: { paddingBottom: 80 } });
