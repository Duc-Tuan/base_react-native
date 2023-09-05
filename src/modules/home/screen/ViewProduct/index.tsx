import useFetchData from 'hooks/useFetchData';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ApiProducts } from 'store/axios';
import { styleGlobal } from 'types/StyleGlobal';

const ViewProduct = React.forwardRef((_, ref) => {
  const func1 = React.useCallback(() => ApiProducts.getProducts().then(res => res), []);

  const { data: revenueTotalDate, fetchNoLoading: onRefreshTotalDate } = useFetchData(func1);

  const onRefresh = React.useCallback(async () => {
    await Promise.all([onRefreshTotalDate()]);
  }, [onRefreshTotalDate]);

  React.useImperativeHandle(ref, () => ({ onRefresh }));

  return (
    <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10, styleGlobal.flex_wrap]}>
      {revenueTotalDate?.map((i: any, idx: number) => (
        <View key={idx} style={styles.container}>
          <Image
            style={styles.viewImage}
            source={{
              uri: i?.productImage,
            }}
          />
          <Text>{i?.productName}</Text>
        </View>
      ))}
    </View>
  );
});

export default ViewProduct;

const styles = StyleSheet.create({ container: { width: '48%' }, viewImage: { width: '100%', height: 100 } });
