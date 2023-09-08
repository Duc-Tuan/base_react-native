import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { IOptions } from 'types/product-types';
import { hexToRgba } from 'utils';

interface IProps {
  data: IOptions;
  selected: IOptions | undefined;
  setSelected: React.Dispatch<React.SetStateAction<IOptions | undefined>>;
  hidden: () => void;
}

const ItemSelect: React.FC<IProps> = ({ data, setSelected, hidden, selected }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        hidden();
        setSelected(data);
      }}
      style={[styleGlobal.padding_4, styles.container, selected?.label === data?.label && styles.viewActive]}>
      <Text style={[styleGlobal.textBold, selected?.label === data?.label && styles.viewText]}>{data?.label}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ItemSelect);

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  viewActive: { backgroundColor: hexToRgba(Colors.primary, 0.1) },
  viewText: { color: Colors.primary, fontWeight: '700' },
});
