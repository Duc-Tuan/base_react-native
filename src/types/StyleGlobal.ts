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
  gap_4: {
    gap: 4,
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
  gap_26: {
    gap: 26,
  },
  gap_30: {
    gap: 30,
  },
  w_full: {
    width: widthFull,
    height: heightFull,
  },
  w: {
    width: '100%',
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
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
  viewImage: {
    width: '100%',
    height: '100%',
  },
  paddingTop_8: {
    paddingTop: 8,
  },
  paddingTop_10: {
    paddingTop: 10,
  },
  paddingTop_12: {
    paddingTop: 12,
  },
  paddingTop_14: {
    paddingTop: 14,
  },
  paddingTop_16: {
    paddingTop: 16,
  },
  paddingBottom_8: {
    paddingBottom: 8,
  },
  paddingBottom_10: {
    paddingBottom: 10,
  },
  paddingBottom_12: {
    paddingBottom: 12,
  },
  paddingBottom_14: {
    paddingBottom: 14,
  },
  paddingBottom_16: {
    paddingBottom: 16,
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
  padding_7: {
    paddingVertical: 7,
    paddingHorizontal: 7,
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
  paddingVertical_2: {
    paddingVertical: 2,
  },
  paddingVertical_4: {
    paddingVertical: 4,
  },
  paddingVertical_6: {
    paddingVertical: 6,
  },
  paddingVertical_8: {
    paddingVertical: 8,
  },
  paddingVertical_10: {
    paddingVertical: 10,
  },
  paddingVertical_12: {
    paddingVertical: 12,
  },
  paddingVertical_14: {
    paddingVertical: 14,
  },
  paddingVertical_16: {
    paddingVertical: 16,
  },
  paddingVertical_18: {
    paddingVertical: 18,
  },
  paddingVertical_20: {
    paddingVertical: 20,
  },
  paddingHorizontal_10: {
    paddingHorizontal: 10,
  },
  paddingHorizontal_4: {
    paddingHorizontal: 4,
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
  textBg: {
    fontWeight: '700',
    color: Colors.primary,
  },
  textFontBold: {
    fontWeight: '700',
    color: Colors.textColor,
  },
  textFontBold_400: {
    fontWeight: '400',
    color: Colors.textColor,
  },
  textFontBold_500: {
    fontWeight: '500',
    color: Colors.textColor,
  },
  textFontSize_10: {
    fontSize: 10,
  },
  textFontSize_12: {
    fontSize: 12,
  },
  textFontSize_14: {
    fontSize: 14,
  },
  textFontSize_16: {
    fontSize: 16,
  },
  textFontSize_18: {
    fontSize: 18,
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
  marginTop_4: {
    marginTop: 4,
  },
  marginTop_8: {
    marginTop: 8,
  },
  marginTop_10: {
    marginTop: 10,
  },
  marginTop_12: {
    marginTop: 12,
  },
  marginTop_14: {
    marginTop: 14,
  },
  marginTop_16: {
    marginTop: 16,
  },
  marginBottom_8: {
    marginBottom: 8,
  },
  marginBottom_10: {
    marginBottom: 10,
  },
  marginBottom_12: {
    marginBottom: 12,
  },
  marginBottom_14: {
    marginBottom: 14,
  },
  marginBottom_16: {
    marginBottom: 16,
  },
  margin_2: {
    marginVertical: 2,
    marginHorizontal: 2,
  },
  margin_4: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
  margin_6: {
    marginVertical: 6,
    marginHorizontal: 6,
  },
  margin_8: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  margin_10: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  margin_12: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  margin_14: {
    marginVertical: 14,
    marginHorizontal: 14,
  },
  zIndex_lv1: {
    zIndex: 10,
  },
  zIndex_lv2: {
    zIndex: 20,
  },
  zIndex_lv3: {
    zIndex: 30,
  },
  zIndex_lv4: {
    zIndex: 40,
  },
  borderBottomPrimary: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  borderBottomWhite: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  backgroundColorTran: {
    backgroundColor: 'transparent',
  },
  backgroundColorWhite: {
    backgroundColor: Colors.white,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export const marginVerticalItemListView = StyleSheet.create({
  container: {
    marginVertical: 1,
  },
});