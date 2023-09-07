import Toast, { ToastProps, ToastPosition } from 'react-native-toast-message';

export const useToast = () => {
  return (
    type: 'success' | 'error' | 'info',
    text: string,
    text2?: string,
    position?: ToastPosition,
    props?: ToastProps,
  ) =>
    type?.length > 0 &&
    Toast.show({
      type,
      text1: text,
      text2,
      position,
      props,
    });
};
