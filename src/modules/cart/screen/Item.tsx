import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { IconAdd, IconRemove } from 'assets/icons';
import { formatCurrency, hexToRgba } from 'utils';

interface IProps {
  data: any;
}

const Item: React.FC<IProps> = ({ data }) => {
  const [qty, setQty] = React.useState<number>(data?.qty);

  const styleCustom = [styleGlobal.alignItems_flexStart, styleGlobal.flexDirection_row, styleGlobal.gap_10];
  const flex = { flex: 1 };

  return (
    <View style={[...styleCustom, styleGlobal.justifyContent_spaceBetween, styleGlobal.padding_6, styles.container]}>
      <View style={[...styleCustom, styleGlobal.justifyContent_flexStart, flex]}>
        <Image source={data?.image} style={styles.viewImage} />
        <View>
          <Text style={{ fontSize: 12, color: hexToRgba(Colors.black, 0.8) }}>SP0001</Text>
          <Text numberOfLines={2} style={styles.viewTextName}>
            {data?.name}
          </Text>
        </View>
      </View>

      <View
        style={[
          styleGlobal.alignItems_flexEnd,
          styleGlobal.flexDirection_column,
          styleGlobal.justifyContent_spaceBetween,
          styleGlobal.gap_10,
          flex,
        ]}>
        <Text style={[styles.viewTextName, { color: Colors.primary }]}>
          {formatCurrency(qty * data?.price, ' vnđ')}
        </Text>
        <View
          style={[
            styleGlobal.justifyContent_flexStart,
            styleGlobal.alignItems_center,
            styleGlobal.flexDirection_row,
            styleGlobal.gap_6,
            styles.changeQty,
          ]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.btn_changeQty]}
            onPress={() => setQty((prev: number) => (prev === 1 ? 1 : prev - 1))}>
            <IconRemove fill={Colors.primary} width={20} height={20} />
          </TouchableOpacity>

          <TextInput
            value={String(qty)}
            style={styles.viewTextInput}
            keyboardType="numeric"
            onChangeText={e => setQty(Number(e) === 1 || Number(e) === 0 ? 1 : Number(e))}
          />

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.btn_changeQty]}
            onPress={() => setQty((prev: number) => prev + 1)}>
            <IconAdd fill={Colors.primary} width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    minHeight: 40,
  },
  viewImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  viewTextName: {
    fontWeight: '700',
  },
  changeQty: {
    backgroundColor: hexToRgba(Colors.primary, 0.8),
    borderColor: hexToRgba(Colors.primary, 0.6),
    paddingHorizontal: 2,
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 30,
    overflow: 'hidden',
  },
  btn_changeQty: {
    padding: 2,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  viewTextInput: {
    width: 30,
    height: 40,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
  },
});
