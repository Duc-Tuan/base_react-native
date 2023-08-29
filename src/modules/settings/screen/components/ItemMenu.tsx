/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ItemSubMenu from './ItemSubMenu';
import { Text, View, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';
import { useBoolean } from 'hooks/useBoolean';
import { debounce } from 'lodash';
import Colors from 'themes/Color';

interface IProps {
  item?: any;
  scrollTo?: (value: number) => void;
}

const ItemMenu: React.FC<IProps> = ({ item, scrollTo }) => {
  const initY = React.useRef<number>(0);
  const [isOpen, { on, off, toggle: toggleOpen }] = useBoolean(true);

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    initY.current = event?.nativeEvent?.layout?.y;
  }, []);

  const handleOpen = React.useCallback(() => {
    toggleOpen();
    debounce(() => {
      if (!isOpen) {
        !!scrollTo && scrollTo(initY?.current);
      }
    }, 100)();
  }, [isOpen, scrollTo, toggleOpen]);

  return (
    <React.Fragment>
      {item?.title && (
        <TouchableOpacity activeOpacity={0.9} onPress={handleOpen}>
          <Text>{item?.title}</Text>
        </TouchableOpacity>
      )}

      {isOpen && (
        <View
          style={[
            styleGlobal.justifyContent_spaceBetween,
            styleGlobal.alignItems_center,
            styleGlobal.flexDirection_row,
            styleGlobal.flex_wrap,
            styleGlobal.gap_10,
          ]}>
          {item?.data?.map((i: any, idx: number) => (
            <ItemSubMenu key={idx} item={i} />
          ))}
        </View>
      )}

      <View onLayout={onLayout} />
    </React.Fragment>
  );
};

export default React.memo(ItemMenu);
