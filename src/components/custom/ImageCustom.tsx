import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';

interface IProps {
  urlImeg?: string;
  styleWapper?: StyleProp<ImageStyle>;
}

const ImageCustom: React.FC<IProps> = ({ urlImeg, styleWapper }) => {
  return (
    <Image
      source={
        urlImeg
          ? {
              uri: urlImeg,
            }
          : require('assets/images/Default.png')
      }
      style={[styleGlobal.image, styleGlobal.padding_10, styleWapper]}
    />
  );
};

export default ImageCustom;
