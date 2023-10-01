import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IComments } from './const';
import { styleGlobal } from 'types/StyleGlobal';
import { ImageCustom } from 'components';
import dayjs from 'dayjs';
import { hexToRgba } from 'utils';
import Colors from 'themes/Color';

interface IProps {
  data: IComments;
}

const ItemComment: React.FC<IProps> = ({ data }) => {
  return (
    <View
      style={[
        styleGlobal.dFlex_center,
        styleGlobal.alignItems_flexStart,
        styleGlobal.justifyContent_flexStart,
        styleGlobal.marginBottom_10,
        styleGlobal.gap_10,
        { marginRight: 2 },
      ]}>
      <ImageCustom urlImeg={data?.commentUserId?.userImage} styleWapper={[styles.ViewImage]} />
      <View style={[styleGlobal.flex_1]}>
        <View>
          <Text style={[styleGlobal.textBg]}>
            {data?.commentUserId?.userNickname}{' '}
            <Text style={[styleGlobal.textFontSize_12, styles.ViewTextTimge]}>
              - {dayjs(data?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
            </Text>
          </Text>
        </View>
        <View style={[styleGlobal.padding_4, styleGlobal.border, styleGlobal.marginTop_4, styles.ViewComments]}>
          <Text style={[styleGlobal.textPrimary]}>{data?.componentContent}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemComment;

const styles = StyleSheet.create({
  ViewImage: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  ViewTextTimge: {
    color: hexToRgba(Colors.black, 0.4),
    fontWeight: '400',
  },
  ViewComments: {
    backgroundColor: hexToRgba(Colors.black, 0.03),
    borderColor: hexToRgba(Colors.black, 0.2),
    width: '100%',
    borderRadius: 4,
  },
});
