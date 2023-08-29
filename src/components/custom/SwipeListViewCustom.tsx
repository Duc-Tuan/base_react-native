/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { IconDelete } from 'assets/icons';
import IconSync from 'assets/icons/icon_sync';
import React, { useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import Colors from 'themes/Color';
import { marginVerticalItemListView, styleGlobal } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';
import CheckBox from './CheckBox';
import { useBoolean } from 'hooks/useBoolean';
interface IProps {
  handleRemoveItem?: (item: any) => void;
  data: any[];
  isCheckAll?: boolean;
  renderItem: (rowData: ListRenderItemInfo<any>, rowMap: RowMap<any>) => JSX.Element;
  ListFooterComponent?: () => React.ReactNode;
  setSelectCheck?: React.Dispatch<React.SetStateAction<number[]>>;
  selectCheck?: number[];
  styleWrapper?: ViewStyle;
}

const SwipeListViewCustom = React.forwardRef<FlatList, IProps>(
  (
    {
      handleRemoveItem,
      data,
      renderItem,
      ListFooterComponent,
      isCheckAll,
      setSelectCheck,
      selectCheck,
      styleWrapper,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const refSwipeListView = React.useRef<any>();
    const refFlatList = React.useRef<FlatList>();
    const [isClear, { on, off, toggle }] = useBoolean();
    const animated = React.useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => {
      return refFlatList.current as FlatList;
    });

    const handleRemoveItemComponent = React.useCallback(
      (rowData: ListRenderItemInfo<any>, rowMap: RowMap<any>) => () => {
        if (!!rowData?.item?.key && !!rowMap && rowMap[rowData?.item?.key]) {
          rowMap[rowData?.item?.key]?.closeRow();
        }
        !!handleRemoveItem && handleRemoveItem(rowData?.item);
      },
      [handleRemoveItem],
    );

    const renderChildren = React.useCallback(
      (rowData: ListRenderItemInfo<any>, rowMap: RowMap<any>) => {
        const { item } = rowData;
        return (
          <View style={[styleGlobal.justifyContent_flexStart, styleGlobal.flexDirection_row, styles.viewChecked]}>
            <View style={styleGlobal.dFlex_center}>
              <CheckBox
                value={selectCheck?.some(i => i === item?.id)}
                onChange={e => {
                  if (setSelectCheck) {
                    if (e) {
                      selectCheck?.some(i => i === item?.id) ? undefined : setSelectCheck(prev => [...prev, item?.id]);
                    } else {
                      setSelectCheck(prev => prev.filter(i => i !== item?.id));
                    }
                  }
                }}
              />
            </View>
            <View style={styleGlobal.flex_1}>{renderItem(rowData, rowMap)}</View>
          </View>
        );
      },
      [selectCheck],
    );

    React.useEffect(() => {
      const setTime = setTimeout(() => {
        setSelectCheck && selectCheck?.length !== 0 && setSelectCheck([]);
      }, 100);

      return () => {
        clearTimeout(setTime);
      };
    }, [isClear]);

    const spin = animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
      extrapolate: 'clamp',
    });

    const renderHiddenItem = React.useCallback(
      (rowData: ListRenderItemInfo<any>, rowMap: RowMap<any>) => (
        <View style={[marginVerticalItemListView.container, styles.renderHiddenItem]}>
          <TouchableOpacity onPress={handleRemoveItemComponent(rowData, rowMap)} style={styles.viewButtonTrash}>
            <IconDelete fill="#fff" />
            <Text style={styles.textDelete}>{t('Xóa')}</Text>
          </TouchableOpacity>
        </View>
      ),
      [handleRemoveItemComponent, t],
    );

    const dataConvert = React.useMemo(
      () => (!!data && data?.length > 0 ? data?.map((i, index) => ({ ...i, key: `${index}` })) : []),
      [data],
    );

    const listViewRef = React.useCallback((e: any) => {
      refFlatList.current = e;
    }, []);


    const renderHeader = React.useCallback(() => {
      return (
        <View
          style={[
            marginVerticalItemListView.container,
            styleGlobal.justifyContent_spaceBetween,
            styleGlobal.flexDirection_row,
            styleGlobal.alignItems_center,
            styleGlobal.padding_8,
            styles.viewSelected,
          ]}>
          <Text style={{ color: Colors.black }}>
            Đã chọn{' '}
            <Text style={{ color: Colors.primary, fontWeight: '700', fontSize: 16 }}>{selectCheck?.length}</Text> sản
            phẩm
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.viewBtnClear}
            onPress={() => {
              Animated.timing(animated, { toValue: 1, useNativeDriver: true }).start(() => {
                animated.setValue(0);
              });
              toggle();
            }}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <IconSync fill={Colors.primary} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
    }, [selectCheck]);

    return (
      <SwipeListView
        listViewRef={listViewRef}
        recalculateHiddenLayout
        ref={refSwipeListView}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe
        renderItem={isCheckAll ? renderChildren : renderItem}
        rightOpenValue={-70}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        removeClippedSubviews
        windowSize={210}
        data={dataConvert}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={isCheckAll ? renderHeader : undefined}
        style={[styles.container, styleWrapper]}
        {...rest}
      />
    );
  },
);

export default React.memo(SwipeListViewCustom);

const styles = StyleSheet.create({
  container: {
    backgroundColor: hexToRgba(Colors.primary, 0.4),
  },
  renderHiddenItem: { flex: 1, alignItems: 'flex-end', marginVertical: 2 },
  viewButtonTrash: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#D44333', width: 70, flex: 1 },
  textDelete: { color: '#fff', fontSize: 14, fontWeight: '400', marginTop: 7 },
  viewSelected: { backgroundColor: Colors.white },
  viewChecked: { backgroundColor: Colors.white, marginVertical: 1, paddingLeft: 8 },
  viewBtnClear: {
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba(Colors.primary, 0.2),
  },
});
