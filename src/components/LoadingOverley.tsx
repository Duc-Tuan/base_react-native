import { debounce } from 'lodash';
import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';
import Colors from 'themes/Color';

interface IProps {
  cancelable?: boolean;
  overlayColor?: string;
  visible?: boolean;
  customIndicator?: React.ReactNode;
}

const LoadingOverley = React.forwardRef<any, IProps>(({ cancelable, overlayColor, visible }, ref) => {
  const [visibleState, setVisibleState] = React.useState(visible);
  const { height, width } = useWindowDimensions();

  const close = React.useCallback(() => {
    setVisibleState(false);
  }, []);

  React.useEffect(() => {
    setVisibleState(visible);
  }, [visible]);

  const handleOnRequestClose = React.useCallback(() => {
    if (cancelable) {
      close();
    }
  }, [cancelable, close]);

  const autoRefresh = React.useCallback(() => {
    setVisibleState(true);
    debounce(() => setVisibleState(false), 300)();
  }, []);

  React.useImperativeHandle(ref, () => ({ autoRefresh }));

  return (
    <Modal
      deviceHeight={height + (StatusBar.currentHeight || 0)}
      deviceWidth={width}
      supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right', 'portrait-upside-down']}
      statusBarTranslucent
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor={overlayColor}
      onBackButtonPress={handleOnRequestClose}
      style={styles.styleModal}
      isVisible={visibleState}>
      <View style={styles.background}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    </Modal>
  );
});

export default React.memo(LoadingOverley);

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  styleModal: { margin: 0 },
});
