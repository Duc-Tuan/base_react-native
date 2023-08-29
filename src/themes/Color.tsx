/* eslint-disable prettier/prettier */
import { hexToRgba } from '../utils';

const Colors = {
  primary: '#C2185B',
  second: hexToRgba('#C2185B', 0.1),
  textColor: '#181725',
  background: '#F4F8F8',
  white: '#ffffff',
  backgroundNote: '#F2FAFE',
  textSecond: '#65676B',
  border: '#E6E6E6',
  black: '#000000',
  iconHeader: '#747C87',
  blue: '#3B82F6',
  danger: '#D44333',
  titleBlue: '#007EFF',
  inputDisable: '#F7F8F8',
  warning: '#F6A609',
  green: '#16A34A',
  error: '#fb4e4e',
};

export const setColorPrimary = (_value: string) => {
  Colors.primary = _value;
  Colors.second = hexToRgba(_value, 0.1);
};

export const ColorsSelect = {
  primary: '#C2185B',
  pick: '#009a93',
  // lightBlue: "#00c39f",
  lightGray: '#3E5369',
  blue: '#1976D2',
  Violet: '#7B1FA2',
};

export default Colors;

export const heigthHeader = 60;
export const heigthFooter = 60;
