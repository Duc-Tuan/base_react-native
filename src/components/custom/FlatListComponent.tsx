import React from 'react';
import { FlatList, RefreshControl, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';

interface IProps {
  data: any[];
  renderItem: (item: any) => React.ReactElement;
  listFooterComponent?: () => React.ReactElement;
  listHeaderComponent?: () => React.ReactElement;
  onEndReached?: () => void;
  onRefresh?: any;
  onEndReachedThreshold?: number;
  refreshing?: boolean;
  styleWrapper?: StyleProp<ViewStyle>;
  styleCustom?: StyleProp<ViewStyle>;
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
      styleCustom,
      listHeaderComponent,
      ...rest
    },
    ref,
  ) => {
    React.useImperativeHandle(ref, () => ({ onRefresh }));

    return (
      <FlatList
        contentContainerStyle={[styleGlobal.gap_10, styleGlobal.paddingBottom_16, styleCustom]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh && onRefresh} tintColor={Colors.primary} />
        }
        style={[styles.contaiener, styleWrapper]}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListHeaderComponent={listHeaderComponent}
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        ListFooterComponent={listFooterComponent}
        {...rest}
      />
    );
  },
);

export default FlatListComponent;

const styles = StyleSheet.create({ contaiener: {} });
