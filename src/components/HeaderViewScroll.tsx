/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { styleGlobal, widthFull } from 'types/StyleGlobal';

interface IProps {
  intinalData: any[];
  renDerItem: (data: any) => JSX.Element;
  pagingEnabled?: boolean;
  isScroll?: boolean;
  styleFlatList?: StyleProp<ViewStyle>;
  onHandleScroll?: (data: any) => void;
}

const HeaderViewScroll: React.FC<IProps> = ({
  intinalData,
  renDerItem,
  pagingEnabled = false,
  isScroll = false,
  styleFlatList,
  onHandleScroll,
}) => {
  const [data, setData] = React.useState<any[]>(intinalData);
  const refFlat = React.useRef<any>();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const renderItem = React.useCallback(
    ({ item, idx }: any) => {
      return <React.Fragment key={idx}>{renDerItem(item)}</React.Fragment>;
    },
    [renDerItem],
  );

  React.useEffect(() => {
    setData(intinalData);
  }, [intinalData]);

  //handle scroll
  const handleScroll = React.useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / widthFull;
    setActiveIndex(index);
  }, []);

  React.useEffect(() => {
    onHandleScroll && onHandleScroll(activeIndex);
  }, [activeIndex, onHandleScroll]);

  return (
    <FlatList
      ref={refFlat}
      style={styleFlatList}
      data={data}
      contentContainerStyle={styleGlobal.gap_10}
      renderItem={renderItem}
      horizontal
      pagingEnabled={pagingEnabled}
      onScroll={handleScroll}
      keyExtractor={i => i.id}
      getItemLayout={(data, index) => ({
        length: widthFull,
        offset: widthFull * index,
        index,
      })}
      showsVerticalScrollIndicator={isScroll}
      showsHorizontalScrollIndicator={isScroll}
    />
  );
};

export default React.memo(HeaderViewScroll);
