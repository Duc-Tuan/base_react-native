import { IconDelete } from 'assets/icons';
import React, { useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import Colors from 'themes/Color';
import { marginVerticalItemListView } from 'types/StyleGlobal';
import { hexToRgba } from 'utils';

interface IProps {
  handleRemoveItem?: (item: any) => void;
  data: any[];
  renderItem?: (rowData: ListRenderItemInfo<any>, rowMap: RowMap<any>) => JSX.Element;
  ListFooterComponent?: () => React.ReactNode;
  ListHeaderComponent?: () => React.ReactNode;
}

const SwipeListViewCustom = React.forwardRef<FlatList, IProps>(
  ({ handleRemoveItem, data, renderItem, ListFooterComponent, ListHeaderComponent, ...rest }, ref) => {
    const { t } = useTranslation();
    const refSwipeListView = React.useRef<any>();
    const refFlatList = React.useRef<FlatList>();

    useImperativeHandle(ref, () => {
      console.log('List view...');
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

    return (
      <SwipeListView
        listViewRef={listViewRef}
        recalculateHiddenLayout
        ref={refSwipeListView}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe
        renderItem={renderItem}
        rightOpenValue={-70}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        removeClippedSubviews
        windowSize={210}
        data={dataConvert}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.container}
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
});
