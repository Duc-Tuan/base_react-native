import { StyleSheet, FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';

interface IProps {
  data: any[];
  renderItem: (item: any) => React.ReactElement;
  listFooterComponent?: () => React.ReactElement;
  onEndReached?: () => void;
  onRefresh?: any;
  onEndReachedThreshold?: number;
  refreshing?: boolean;
  styleWrapper?: StyleProp<ViewStyle>;
}

const FlatListComponent: React.FC<IProps> = React.forwardRef(
  (
    {
      data,
      renderItem,
      onEndReached,
      onEndReachedThreshold = 0.5,
      onRefresh,
      listFooterComponent,
      refreshing = false,
      styleWrapper,
    },
    ref,
  ) => {
    React.useImperativeHandle(ref, () => ({ onRefresh }));
    return (
      <FlatList
        contentContainerStyle={[styleGlobal.dFlex_center, styleGlobal.gap_10, styleGlobal.flex_wrap]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh && onRefresh} tintColor={Colors.primary} />
        }
        style={[styles.contaiener, styleWrapper]}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        ListFooterComponent={listFooterComponent}
      />
    );
  },
);

export default FlatListComponent;

const styles = StyleSheet.create({ contaiener: {} });
