/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig, InfoToast } from 'react-native-toast-message';
import { IconError, IconInfo, IconSuss } from '../assets/icons';
const width = Dimensions.get('window').width - 60;

export const toastConfig: ToastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: props => (
    <BaseToast
      {...props}
      style={[
        styles.styleCustom,
        {
          shadowColor: '#1f8503',
          backgroundColor: '#1f8503',
        },
      ]}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={styles.styleText}
      renderLeadingIcon={() => (
        <View style={{ paddingRight: 0, marginLeft: 20 }}>
          <IconSuss fill="white" />
        </View>
      )}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: props => (
    <ErrorToast
      {...props}
      style={[
        styles.styleCustom,
        {
          backgroundColor: '#f00a1d',
          shadowColor: '#f00a1d',
        },
      ]}
      text1Style={styles.styleText}
      renderLeadingIcon={() => (
        <View style={{ paddingRight: 0, marginLeft: 20 }}>
          <IconError fill="white" />
        </View>
      )}
    />
  ),

  info: props => (
    <InfoToast
      {...props}
      style={[
        styles.styleCustom,
        {
          backgroundColor: '#0077ed',
          shadowColor: '#0077ed',
        },
      ]}
      text1Style={styles.styleText}
      renderLeadingIcon={() => (
        <View style={{ paddingRight: 0, marginLeft: 20 }}>
          <IconInfo fill="white" />
        </View>
      )}
    />
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.

      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
  tomatoToast: ({ text1, props }) => {
    return (
      <View
        style={{
          width: width,
          padding: 10,
          backgroundColor: 'tomato',
        }}>
        <Text>{text1}</Text>
        <Text numberOfLines={2}>{props.uuid}</Text>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  styleCustom: {
    borderLeftWidth: 0,
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
    height: 'auto',
  },
  styleText: {
    color: 'white',
    fontSize: 14,
  },
});
