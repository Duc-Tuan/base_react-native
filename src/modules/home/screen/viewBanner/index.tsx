import { ApiBanners } from 'assets/api';
import { LoadingOverley } from 'components';
import FlatListhorizontal from 'components/custom/FlatListhorizontal';
import useFetchData from 'hooks/useFetchData';
import BannerItem from 'modules/components/banner';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';

const ViewBanner = React.forwardRef((_, ref) => {
  const func1 = React.useCallback(() => ApiBanners.getBanners().then(res => res), []);
  const { data: dataList, onRefresh, loading } = useFetchData(func1);

  React.useImperativeHandle(ref, () => ({ onRefresh }));

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingOverley visible={loading} />
      ) : (
        <FlatListhorizontal
          initaldata={dataList}
          renderItem={(d: any) => <BannerItem data={d?.item} />}
          stylesWrapper={[styleGlobal.backgroundColorWhite, styleGlobal.boxshadow, styles.viewFlatList]}
        />
      )}
    </View>
  );
});

export default ViewBanner;

const styles = StyleSheet.create({ container: {}, viewFlatList: { borderRadius: 10, overflow: 'hidden' } });
