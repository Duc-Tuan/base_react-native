import { ApiProducts } from 'assets/api';
import { HeaderViewAll, LoadingOverley } from 'components';
import { PathName } from 'configs';
import useFetchData from 'hooks/useFetchData';
import ProductItem from 'modules/components/product';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';

const ViewProduct = React.forwardRef((_, ref) => {
  const func1 = React.useCallback((page: number) => ApiProducts.getProducts(page, 6).then(res => res), []);
  const { data: dataList, onRefresh, loading } = useFetchData(func1);

  React.useImperativeHandle(ref, () => ({ onRefresh }));

  return (
    <View style={[styles.container]}>
      <HeaderViewAll title="Sản phẩm" namePath={PathName.MERCHENTSCREEN} />
      {loading ? (
        <LoadingOverley visible={loading} />
      ) : (
        <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10, styleGlobal.flex_wrap]}>
          {dataList?.data?.map((i: any, idx: number) => (
            <ProductItem key={idx} data={i} />
          ))}
        </View>
      )}
    </View>
  );
});

export default ViewProduct;

const styles = StyleSheet.create({
  container: {},
  viewHeader: { borderRadius: 6 },
  viewImage: { width: '100%', height: 100 },
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
});
