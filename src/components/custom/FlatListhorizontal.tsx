/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  FlatList,
  StyleProp,
  ViewStyle,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal, widthFull } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

interface IProps {
  initaldata: any[];
  renderItem: (data: any) => React.ReactElement;
  stylesWrapper?: StyleProp<ViewStyle>;
  delayTime?: number;
  autoPlay?: boolean;
}

const FlatListhorizontal: React.FC<IProps> = ({
  initaldata,
  renderItem,
  stylesWrapper,
  delayTime = 3000,
  autoPlay = false,
}) => {
  const refFlat = React.useRef<any>();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  console.log(activeIndex);

  React.useEffect(() => {
    const setTimer = autoPlay
      ? setInterval(() => {
          if (activeIndex !== initaldata.length - 1) {
            return refFlat.current.scrollToIndex({
              index: activeIndex + 1,
              animetion: true,
            });
          } else {
            return refFlat.current.scrollToIndex({
              index: 0,
              animetion: true,
            });
          }
        }, delayTime)
      : undefined;

    return () => {
      autoPlay && clearInterval(setTimer);
    };
  }, [activeIndex, autoPlay, initaldata.length]);

  //handle scroll
  const handleScroll = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.ceil(scrollPosition / (widthFull - 20));
    setActiveIndex(index);
  }, []);

  const stylesCustomDot = {
    height: 4,
    width: 20,
    borderRadius: 2,
    borderColor: hexToRgba(Colors.white, 0.5),
  };

  //render dot
  const renderDot = React.useCallback(() => {
    return initaldata.map((dot, idx) => {
      if (activeIndex === idx) {
        return (
          <View
            key={idx}
            style={[
              styleGlobal.border,
              {
                ...stylesCustomDot,
                backgroundColor: Colors.primary,
              },
            ]}
          />
        );
      } else {
        return (
          <View
            key={idx}
            style={[
              styleGlobal.border,
              {
                ...stylesCustomDot,
                backgroundColor: hexToRgba(Colors.black, 0.3),
              },
            ]}
          />
        );
      }
    });
  }, [activeIndex, initaldata]);

  return (
    <View style={stylesWrapper}>
      <FlatList
        ref={refFlat}
        horizontal
        data={initaldata}
        onScroll={handleScroll}
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        getItemLayout={(data, index) => ({
          length: widthFull,
          offset: widthFull * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={[styleGlobal.flexDirection_row, styleGlobal.justifyContent_center, styleGlobal.gap_10, styles.viewDot]}>
        {renderDot()}
      </View>
    </View>
  );
};

export default FlatListhorizontal;

const styles = StyleSheet.create({
  viewDot: {
    position: 'absolute',
    bottom: 4,
    width: '100%',
  },
});
