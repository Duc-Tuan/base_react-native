/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from 'react-native';
import { hexToRgba } from '../utils';
import Colors from '../themes/Color';

export const widthFull = Dimensions.get('window').width;
export const heightFull = Dimensions.get('window').height;

export const styleGlobal = StyleSheet.create({
  dFlex_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexDirection_column: {
    flexDirection: 'column',
  },
  flexDirection_row: {
    flexDirection: 'row',
  },
  alignItems_center: {
    alignItems: 'center',
  },
  alignItems_baseline: {
    alignItems: 'baseline',
  },
  alignItems_stretch: {
    alignItems: 'stretch',
  },
  alignItems_flexEnd: {
    alignItems: 'flex-end',
  },
  alignItems_flexStart: {
    alignItems: 'flex-start',
  },
  justifyContent_center: {
    justifyContent: 'center',
  },
  justifyContent_flexEnd: {
    justifyContent: 'flex-end',
  },
  justifyContent_flexStart: {
    justifyContent: 'flex-start',
  },
  justifyContent_spaceAround: {
    justifyContent: 'space-around',
  },
  justifyContent_spaceBetween: {
    justifyContent: 'space-between',
  },
  justifyContent_spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyContent_wrap: {
    flexWrap: 'wrap',
  },
  gap_10: {
    gap: 10,
  },
  gap_12: {
    gap: 12,
  },
  gap_14: {
    gap: 14,
  },
  gap_16: {
    gap: 16,
  },
  gap_18: {
    gap: 18,
  },
  gap_20: {
    gap: 20,
  },
  w_full: {
    width: widthFull,
    height: heightFull,
  },
  boxshadow: {
    shadowColor: hexToRgba(Colors.black, 0.6),
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 5,
    elevation: 10,
  },
  border: {
    borderColor: hexToRgba(Colors.black, 0.6),
    borderWidth: 0.5,
    borderStyle: 'solid',
  },
  lv1: {
    zIndex: 10,
  },
  lv2: {
    zIndex: 20,
  },
  lv3: {
    zIndex: 30,
  },
  lv4: {
    zIndex: 40,
  },
  textBold: {
    fontFamily: 'Roboto_Bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
