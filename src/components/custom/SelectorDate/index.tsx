import { StyleSheet, Text, View, TouchableOpacity, Platform, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import { useBoolean } from 'hooks/useBoolean';
import WrapperModal from 'components/WrapperModal';
import { styleGlobal } from 'types/StyleGlobal';
import Colors from 'themes/Color';
import { useTranslation } from 'react-i18next';
import { hexToRgba } from 'utils';
import ButtonCustom from '../ButtonCustom';
import dayjs from 'dayjs';
import { IconCalendar, IconClose } from 'assets/icons';

interface IProps {
  styleWrapper?: StyleProp<ViewStyle>;
  placeholder?: string;
  onChange?: (data?: any) => void;
  value?: string;
  label?: string;
  required?: boolean;
}

const SelectorDate: React.FC<IProps> = ({ styleWrapper, placeholder, onChange, value, label, required = false }) => {
  const { t } = useTranslation();
  const [isPopup, { on, off, toggle }] = useBoolean();
  const [date, setDate] = React.useState<Date>(new Date());
  const [data, setData] = React.useState<Date | undefined>();
  const hidden = React.useCallback(() => off(), []);
  //   const ref = useClickOutside<View>(hidden);

  const actions = React.useCallback(() => {
    return [
      <ButtonCustom
        text="Chọn ngay"
        action={() => {
          onChange && onChange(date);
          setData(date);
          hidden();
        }}
      />,
    ];
  }, [date]);

  React.useEffect(() => {
    value && setDate(new Date(value));
  }, [value]);

  const handleClear = React.useCallback(() => {
    setData(undefined);
  }, []);

  return (
    <>
      <View>
        {label && (
          <Text style={styles.viewTextLable}>
            {t(label)}
            {required && (
              <Text style={{ color: hexToRgba(Colors.black, 0.6) }}>
                (<Text style={styles.viewRequired}>*</Text>)
              </Text>
            )}
          </Text>
        )}
        <View style={[styleGlobal.border, styles.container, styleWrapper]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => toggle()}
            style={Platform.OS === 'ios' ? styleGlobal.padding_2 : styleGlobal.padding_6}>
            <View style={styleGlobal.dflex_spaceBetween}>
              <Text style={[styleGlobal.paddingVertical_4, styles.viewTextLabel]}>
                {data ? (
                  <Text style={{ fontWeight: '700' }}>{dayjs(data).format('DD / MM / YYYY')}</Text>
                ) : (
                  t(placeholder ?? 'Chọn ngày')
                )}
              </Text>

              <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
                {data && (
                  <TouchableOpacity activeOpacity={0.8} onPress={handleClear}>
                    <IconClose fill={hexToRgba(Colors.black, 0.6)} />
                  </TouchableOpacity>
                )}
                <IconCalendar fill={hexToRgba(Colors.black, 0.6)} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {isPopup && (
        <WrapperModal
          isVisible={isPopup}
          textHeader="Chọn ngày sinh"
          styleTextHeader={styles.ViewTextHeaderModel}
          isFooter
          hiddenPopup={hidden}
          footer={actions}>
          <View style={[styleGlobal.padding_10]}>
            <DatePicker date={date} onDateChange={setDate} mode="date" />
          </View>
        </WrapperModal>
      )}
    </>
  );
};

export default React.memo(SelectorDate);

const styles = StyleSheet.create({
  container: {
    ...styleGlobal.boxshadow,
    shadowOpacity: 0.2,
    borderRadius: 4,
    paddingHorizontal: 4,
    backgroundColor: 'white',
    paddingTop: Platform.select({
      ios: 6,
      android: 0,
      default: 0,
    }),
    paddingBottom: Platform.select({
      ios: 6,
      android: 0,
      default: 0,
    }),
    fontSize: 18,
    width: '100%',
    borderColor: hexToRgba(Colors.black, 0.2),
  },
  viewTextLable: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: Platform.select({
      ios: 13,
      android: 14,
      default: 13,
    }),
    marginBottom: 4,
  },
  viewRequired: { color: 'red' },
  viewTextLabel: {
    color: Colors.textColor,
  },
  ViewTextHeaderModel: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.black,
  },
});
