import { ApiCategories } from 'assets/api';
import { HeaderViewAll, LoadingOverley } from 'components';
import FlatListhorizontal from 'components/custom/FlatListhorizontal';
import { PathName } from 'configs';
import useFetchData from 'hooks/useFetchData';
import CategoryItem from 'modules/components/categoriy';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styleGlobal } from 'types/StyleGlobal';
import { chunkArray } from 'utils';

const ViewCategories = React.forwardRef((_, ref) => {
  const [dataCategories, setDataCategories] = React.useState<any[]>([]);
  const func1 = React.useCallback(() => ApiCategories.getCategories().then(res => res), []);
  const { data: dataList, onRefresh, loading } = useFetchData(func1);

  React.useImperativeHandle(ref, () => ({ onRefresh }));

  React.useEffect(() => {
    var result = chunkArray(dataList, 6);
    setDataCategories(result);
  }, [dataList]);

  return (
    <View style={[styles.container]}>
      <HeaderViewAll title="Thể loại" namePath={PathName.CATEGORIESSCREEN} />
      {loading ? (
        <LoadingOverley visible={loading} />
      ) : (
        <FlatListhorizontal
          initaldata={dataCategories}
          renderItem={(d: any) => <CategoryItem data={d?.item} />}
          stylesWrapper={[
            styleGlobal.lv1,
            styleGlobal.backgroundColorWhite,
            styleGlobal.paddingVertical_14,
            styleGlobal.boxshadow,
            styles.viewFlatList,
          ]}
        />
      )}
    </View>
  );
});

export default ViewCategories;

const styles = StyleSheet.create({ container: {}, viewFlatList: { borderRadius: 10 } });
