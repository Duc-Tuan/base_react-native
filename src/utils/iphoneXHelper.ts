/* eslint-disable prettier/prettier */
import { Dimensions, Platform } from 'react-native';

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;
const STATUSBAR_IP14_HEIGHT = 59;
const STATUSBAR_IP14MAX_HEIGHT = 59;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const IP14PRO_WIDTH = 393;
const IP14PRO_HEIGHT = 852;

const IP14MAX_WIDTH = 430;
const IP14MAX_HEIGHT = 932;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
let isIPhoneWithMonobrow_v = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
    if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        statusBarHeight = STATUSBAR_IP12_HEIGHT;
    } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
    } else if (W_WIDTH === IP14PRO_WIDTH && W_HEIGHT === IP14PRO_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        statusBarHeight = STATUSBAR_IP14_HEIGHT;
    } else if (W_WIDTH === IP14MAX_WIDTH && W_HEIGHT === IP14MAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        statusBarHeight = STATUSBAR_IP14MAX_HEIGHT;
    }
}

export const isIphoneX = () => isIPhoneWithMonobrow_v;

export function getStatusBarHeight() {
    return Platform.select({
        ios: statusBarHeight,
        // android: StatusBar.currentHeight,
        android: 0,
        default: 0,
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}
