import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import React from 'react';
import { styleGlobal } from 'types/StyleGlobal';
import ApiComments from 'assets/api/ApiComments';
import useFetchDataList from 'hooks/useFetchDataList';
import Colors from 'themes/Color';
import { ButtonCustom, FlatListComponent, InputCustom } from 'components';
import { hexToRgba } from 'utils';
import { useGetAccount } from 'hooks/useGetAccount';
import { useToast } from 'hooks/useToast';
import ItemComment from './Item';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

interface IProps {
  id?: string | number;
}

const Comments: React.FC<IProps> = ({ id }) => {
  const { t } = useTranslation();
  const [valueComments, setValueComments] = React.useState<string>('');
  const { isLogin, user, token } = useGetAccount();
  const [loadingPost, setLoadingPost] = React.useState<boolean>(false);
  const toast = useToast();
  const func1 = React.useCallback((page: number) => ApiComments.getComments(page, 8, id).then(res => res), [id]);

  const { data: dataList, onRefresh, loading, refreshing, hasNext, onEndReached, setData } = useFetchDataList(func1);

  const handleSend = async () => {
    try {
      setLoadingPost(true);
      const res = await ApiComments.createComments(String(id), valueComments, token);
      if (res?.status) {
        const data = {
          commentUserId: {
            userImage: user?.userImage,
            userNickname: user?.userNickname,
          },
          componentContent: valueComments,
          createdAt: new Date(),
        };
        const dataNew: any[] = cloneDeep(dataList);
        dataNew.unshift(data);
        setData(dataNew);
        setValueComments('');
      }
      return toast('success', 'Gửi bình luận thành công.');
    } catch (error) {
      return toast('error', 'Đã xảy ta lỗi. Vui lòng quay lại sau.');
    } finally {
      setLoadingPost(false);
    }
  };

  const listFooterComponent = React.useCallback(
    () => (
      <View style={[hasNext && styles.listFooterComponent]}>
        {hasNext && <ActivityIndicator color={Colors.primary} />}
      </View>
    ),
    [hasNext],
  );

  const renderItem = React.useCallback(
    (item: any) => {
      return <ItemComment data={item?.item} />;
    },
    [id],
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.ViewContent]}>
        {loading ? (
          <View style={[styles.listFooterComponent]}>{<ActivityIndicator color={Colors.primary} />}</View>
        ) : dataList?.length === 0 ? (
          <View style={[styleGlobal.dFlex_center, styleGlobal.flex_1, { minHeight: 600 }]}>
            <Text style={[styleGlobal.textPrimary]}>{t('Chưa thấy thằng nào bình luận về sản phẩm này.')}</Text>
          </View>
        ) : (
          <FlatListComponent
            data={dataList}
            onRefresh={onRefresh}
            refreshing={refreshing || loading}
            renderItem={renderItem}
            styleWrapper={[styleGlobal.padding_10]}
            listFooterComponent={listFooterComponent}
            onEndReached={onEndReached}
          />
        )}
      </View>

      <View
        style={[
          styleGlobal.padding_10,
          styleGlobal.dFlex_center,
          styleGlobal.justifyContent_flexStart,
          styleGlobal.gap_10,
          styles.ViewButton,
        ]}>
        <InputCustom
          disabled={!isLogin}
          onChange={setValueComments}
          valueText={valueComments}
          placeholder="Nhập bình luận..."
          inputStyle={[{ borderColor: hexToRgba(Colors.primary, 0.6) }]}
          stylesWrapper={[{ width: '80%' }]}
        />
        <ButtonCustom
          text="Gửi"
          styleButton={{ flex: 1, height: '100%' }}
          action={handleSend}
          disabled={loadingPost || !isLogin}
          typeButton={loadingPost || !isLogin ? 'disabled' : 'main'}
        />
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  ViewContent: { paddingBottom: 30, paddingTop: 10, height: '100%' },
  ViewButton: { width: '100%', position: 'absolute', bottom: 0, left: 0 },
  listFooterComponent: { height: 50, justifyContent: 'center', alignItems: 'center' },
});
