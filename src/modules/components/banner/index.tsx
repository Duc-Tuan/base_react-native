import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { styleGlobal, widthFull } from 'types/StyleGlobal';

interface IProps {
  data: any;
}

const BannerItem: React.FC<IProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          style={[styleGlobal.image, styles.img]}
          source={{
            uri: data?.bannerImage,
          }}
        />
      </View>
    </View>
  );
};

export default BannerItem;

const styles = StyleSheet.create({
  container: { width: widthFull - 20 },
  viewImage: { width: '100%', height: 160 },
  img: { objectFit: 'fill' },
});
