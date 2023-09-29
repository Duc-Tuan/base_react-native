import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import FlatListhorizontal from 'components/custom/FlatListhorizontal';
import { styleGlobal } from 'types/StyleGlobal';
import ImagesDetail from './ImagesDetail';
import { ImageCustom } from 'components';
import { hexToRgba } from 'utils';
import Colors from 'themes/Color';

interface IProps {
  data: string[];
}

const ViewImageDetail: React.FC<IProps> = ({ data }) => {
  const [selector, setSelector] = React.useState<number>(0);

  return (
    <View style={[styleGlobal.dflex_spaceBetween, styleGlobal.gap_10, styleGlobal.alignItems_flexStart]}>
      <View
        style={[
          styleGlobal.dFlex_center,
          styleGlobal.flexDirection_column,
          styleGlobal.justifyContent_flexStart,
          styleGlobal.gap_10,
          { height: 280 },
        ]}>
        {data?.map((i: string, idx: number) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={idx}
              onPress={() => {
                setSelector(idx * 0.7697560826743521);
              }}
              style={[
                styleGlobal.border,
                styles.ViewLeft,
                Math.ceil(selector) === idx && {
                  borderColor: hexToRgba(Colors.primary, 1),
                  borderWidth: 1.2,
                },
              ]}>
              <ImageCustom urlImeg={i} />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styleGlobal.flex_1]}>
        <FlatListhorizontal
          selector={selector}
          initaldata={[...data]}
          renderItem={(d: any) => <ImagesDetail data={d?.item} />}
          stylesWrapper={[
            styleGlobal.backgroundColorWhite,
            styleGlobal.boxshadow,
            styleGlobal.border,
            styles.viewFlatList,
          ]}
        />
      </View>
    </View>
  );
};

export default ViewImageDetail;

const styles = StyleSheet.create({
  viewFlatList: { borderRadius: 10, overflow: 'hidden', width: '100%' },
  ViewLeft: { width: 60, height: 60, borderRadius: 4, overflow: 'hidden' },
  ViewText: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  ViewTextNumber: {
    color: Colors.white,
    fontWeight: '700',
  },
});
