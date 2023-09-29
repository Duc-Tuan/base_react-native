import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthFull } from 'types/StyleGlobal';
import { ImageCustom } from 'components';

interface IProps {
  data?: string;
}

const ImagesDetail: React.FC<IProps> = ({ data }) => {
  return (
    <View style={[styles.container]}>
      <ImageCustom urlImeg={data} styleWapper={styles.viewImage} />
    </View>
  );
};

export default ImagesDetail;

const styles = StyleSheet.create({
  container: { width: widthFull - 90.8 },
  viewImage: { width: '100%', height: 270, objectFit: 'cover' },
});
