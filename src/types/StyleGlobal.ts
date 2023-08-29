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
    flexDirection: 'row',
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
  dflex_spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  flex_wrap: {
    flexWrap: 'wrap',
  },
  gap_6: {
    gap: 6,
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
    shadowColor: hexToRgba(Colors.black, 0.2),
    shadowOpacity: 0.8,
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
    color: hexToRgba(Colors.black, 0.6),
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  padding_2: {
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  padding_4: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  padding_6: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  padding_8: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  padding_10: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  padding_12: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  padding_14: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  flex_1: {
    flex: 1,
  },
  flex_2: {
    flex: 2,
  },
  flex_3: {
    flex: 3,
  },
  flex_4: {
    flex: 4,
  },
  textPrimary: {
    color: Colors.textColor,
  },
  textFontBold: {
    fontWeight: '700',
  },
  buttonActionsCirc: {
    backgroundColor: hexToRgba(Colors.primary, 0.1),
    // width: 32,
    // height: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export const marginVerticalItemListView = StyleSheet.create({
  container: {
    marginVertical: 1,
  },
});