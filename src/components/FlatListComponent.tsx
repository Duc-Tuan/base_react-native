import React, { forwardRef, memo, MutableRefObject, useCallback, useImperativeHandle, useRef } from 'react';
import { FlatListProps, FlatList } from 'react-native';
import dayjs from 'dayjs';
import { KeyboardAwareFlatList, KeyboardAwareFlatListProps } from 'react-native-keyboard-aware-scroll-view';
import debounce from 'lodash/debounce';

interface IProps extends FlatListProps<any>, KeyboardAwareFlatListProps<any> {
  isKeyboardAware?: boolean;
}

const FlatListComponent = forwardRef<FlatList, IProps>(({ isKeyboardAware, ...rest }, ref) => {
  const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);
  const refFlatList = useRef<FlatList>();

  useImperativeHandle(ref, () => refFlatList.current as FlatList);

  const onScrollToIndexFailed = useCallback(
    (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
      refFlatList.current?.scrollToOffset({
        offset: info.averageItemLength * info.index,
        animated: true,
      });
      debounce(() => refFlatList.current?.scrollToIndex({ index: info.index, animated: true }), 100)();
    },
    [],
  );

  const innerRef = useCallback((e: any) => {
    refFlatList.current = e;
  }, []);

  return isKeyboardAware ? (
    <KeyboardAwareFlatList
      keyExtractor={keyExtractor}
      listKey={dayjs().valueOf().toString()}
      innerRef={innerRef}
      onScrollToIndexFailed={onScrollToIndexFailed}
      {...rest}
    />
  ) : (
    <FlatList
      keyExtractor={keyExtractor}
      listKey={dayjs().valueOf().toString()}
      ref={refFlatList as MutableRefObject<FlatList>}
      onScrollToIndexFailed={onScrollToIndexFailed}
      {...rest}
    />
  );
});

export default memo(FlatListComponent);
