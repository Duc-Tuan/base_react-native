/* eslint-disable prettier/prettier */
import { Platform, StyleProp, TextStyle } from 'react-native';
// import { isTablet } from 'react-native-device-info';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const styleFontWeight = (
    style?: StyleProp<Pick<TextStyle, 'fontWeight' | 'fontFamily' | 'fontSize' | 'color'>>,
) => {
    const fontWeight = style?.fontWeight;
    const fontFamily = style?.fontFamily;

    if (fontFamily) {
        return fontFamily;
    } else {
        if (Platform.OS === 'ios') {
            return 'Roboto';
        } else {
            switch (fontWeight) {
                case '200':
                    return 'Roboto-Thin';
                case '300':
                    return 'Roboto-Light';
                case '400':
                    return 'Roboto-Regular';
                case '500':
                case '600':
                case '700':
                    return 'Roboto-Bold';
                case '800':
                case '900':
                    return 'Roboto-Black';
                default:
                    return 'Roboto-Regular';
            }
        }
    }
};

export const screenOptionsNative: Partial<NativeStackNavigationOptions> = {
    contentStyle: { backgroundColor: '#FFFFFF' },
    headerBackTitleVisible: false,
    headerShown: false,
    // orientation: isTablet() ? 'all' : 'portrait',
    headerTitleStyle: {
        color: '#181B19',
        fontSize: 17,
        fontWeight: '600',
        fontFamily: styleFontWeight({ fontWeight: '600' }),
    },
    // statusBarColor: 'transparent',
    // statusBarAnimation: 'fade',
    // statusBarTranslucent: true,
    // statusBarStyle: 'dark',
    animation: Platform.OS === 'android' ? 'fade' : 'default',
};
