import OpentURL from 'components/custom/OpentURL';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { styleGlobal, widthFull } from 'types/StyleGlobal';

interface IProps {
  data: any;
}

const BannerItem: React.FC<IProps> = ({ data }) => {
  return (
    <OpentURL stylesWrapper={styles.container} url={data?.bannerLink}>
      <View style={styles.viewImage}>
        <Image
          style={[styleGlobal.image, styles.img]}
          source={{
            uri: data?.bannerImage,
          }}
        />
      </View>
    </OpentURL>
  );
};

export default BannerItem;

const styles = StyleSheet.create({
  container: { width: widthFull - 20 },
  viewImage: { width: '100%', height: 160 },
  img: { objectFit: 'fill' },
});
