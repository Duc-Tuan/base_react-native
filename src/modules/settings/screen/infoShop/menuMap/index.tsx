import React from 'react';
import { Animated, LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from 'react-native';

interface IProps {
  scrollA?: any;
}

const MenuMap: React.FC<IProps> = ({ scrollA }) => {
  const [heigth, setHeigth] = React.useState<number>(0);

  const handleLayout = React.useCallback((e: LayoutChangeEvent) => {
    setHeigth(e?.nativeEvent?.layout?.height);
  }, []);
  console.log(heigth);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={
        heigth > 420 && Animated.event([{ nativeEvent: { contentOffset: { y: scrollA } } }], { useNativeDriver: false })
      }
      scrollEventThrottle={16}>
      <View style={[styles.container]} onLayout={handleLayout}>
        <Text>MenuMap</Text>
      </View>
    </ScrollView>
  );
};

export default React.memo(MenuMap);

const styles = StyleSheet.create({ container: { paddingBottom: 100 } });
