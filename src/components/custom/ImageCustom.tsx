import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';
import { checkNullish } from 'utils/genal';
interface IProps {
  urlImeg?: string;
  styleWapper?: StyleProp<ImageStyle>;
}

const ImageCustom: React.FC<IProps> = ({ urlImeg, styleWapper }) => {
  return (
    <Image
      source={
        checkNullish(urlImeg)
          ? {
              uri: urlImeg,
            }
          : require('assets/images/Default.png')
      }
      style={[styleGlobal.viewImage, styleGlobal.padding_10, styleWapper]}
    />
  );
};

export default React.memo(ImageCustom);
