import { useScrollToTop } from '@react-navigation/native';
import { ActivityPenal, HeaderNew } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from 'themes/Color';
import { marginVerticalItemListView } from 'types/StyleGlobal';
import Item from './Item';
import ButtonAddCartNull from './buttonAddCartNull.tsx';

const CartsScreen = () => {
  const { t } = useTranslation();
  const refScrollView = React.useRef<any>();
  const [textSearch, setTextSearch] = React.useState<string>('');
  useScrollToTop(refScrollView);

  const handleRemoveItem = (data: any) => {
    console.log(data);
  };

  const renderChildren = React.useCallback((data: any) => {
    return (
      <View style={[marginVerticalItemListView.container]}>
        <Item data={data?.item} />
      </View>
    );
  }, []);

  const renderfooter = () => {
    return (
      <View style={[marginVerticalItemListView.container, styles.containerFooter]}>
        <Text>Footer</Text>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={[marginVerticalItemListView.container, styles.containerFooter]}>
        <Text>Header</Text>
      </View>
    );
  };
  return (
    <ActivityPenal
      renderHeader={
        <HeaderNew
          setTextSearch={setTextSearch}
          placeholder={t('Tìm kiếm tên, mã sản phẩm...')}
          title={t('Giỏ hàng')}
        />
      }>
      <View style={styles.container}>
        {/* <SwipeListViewCustom
          data={dataCarts}
          handleRemoveItem={handleRemoveItem}
          renderItem={renderChildren}
          ListFooterComponent={renderfooter}
          ListHeaderComponent={renderHeader}
        /> */}
        <ButtonAddCartNull />
      </View>
    </ActivityPenal>
  );
};

export default React.memo(CartsScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerFooter: { backgroundColor: Colors.white, paddingVertical: 40 },
});
