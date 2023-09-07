/* eslint-disable react-hooks/exhaustive-deps */
import IconShare from 'assets/icons/icon_share';
import React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import Colors from 'themes/Color';
import { styleGlobal } from 'types/StyleGlobal';
import { IRouterTabsMenu } from 'types/product-types';
import { hexToRgba } from 'utils';

interface IProps {
  activeTextHeader?: StyleProp<ViewStyle>;
  routerTabs: () => IRouterTabsMenu[];
  SceneMapTabs: {
    [key: string]: React.ComponentType<unknown>;
  };
  isShare?: boolean;
  handleShare?: () => void;
  isDefault?: boolean;
}

const TabsMenu: React.FC<IProps> = ({ routerTabs, SceneMapTabs, isShare, handleShare, isDefault = false }) => {
  const layout = useWindowDimensions();
  const refScroll = React.useRef<any>();

  const renderScene = SceneMap(SceneMapTabs);

  const [layoutScroll, setLayoutScroll] = React.useState<number>(0);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(routerTabs);

  React.useEffect(() => {
    if (index === 0 || index === 1 || index === 2) {
      refScroll?.current?.scrollTo({
        x: 0,
        animated: true,
      });
    } else {
      refScroll?.current?.scrollTo({
        x: (layoutScroll / index) * index,
        animated: true,
      });
    }
  }, [index, layoutScroll]);

  const handleLayout = React.useCallback((e: LayoutChangeEvent) => {
    setLayoutScroll(e.nativeEvent.layout.width);
  }, []);

  const renderTabBar = React.useCallback(
    (props: any) => {
      const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
      return isDefault ? (
        <View style={styleGlobal.paddingVertical_4}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={refScroll}>
            <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]} onLayout={handleLayout}>
              {props.navigationState.routes.map((route: any, i: any) => {
                const opacity = props.position.interpolate({
                  inputRange,
                  outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? 1 : 0.8)),
                });

                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={[
                      styles.tabItem,
                      styleGlobal.backgroundColorTran,
                      styleGlobal.padding_4,
                      props?.navigationState?.index === i
                        ? { borderBottomColor: Colors.primary, borderBottomWidth: 1 }
                        : undefined,
                    ]}
                    key={i}
                    onPress={() => setIndex(i)}>
                    <Animated.Text
                      style={[
                        inputRange.map((inputIndex: any) => inputIndex === i && !isDefault && styles.viewActive),
                        props?.navigationState?.index === i
                          ? { fontWeight: '700', color: Colors.primary }
                          : styleGlobal.textPrimary,
                        { opacity },
                        !isDefault && styleGlobal.padding_10,
                      ]}>
                      {route.title}
                    </Animated.Text>
                  </TouchableOpacity>
                );
              })}
              {isShare && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handleShare}
                  style={[styles.viewButtonShare, { backgroundColor: Colors.primary }]}>
                  <View style={styleGlobal.padding_7}>
                    <IconShare fill={Colors.white} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={[styleGlobal.dFlex_center, styleGlobal.gap_10]}>
          {props.navigationState.routes.map((route: any, i: any) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? 1 : 0.8)),
            });

            const color = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? Colors.white : Colors.white)),
            });

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.tabItem,
                  !isDefault && {
                    backgroundColor:
                      props?.navigationState?.index === i ? Colors.primary : hexToRgba(Colors.primary, 0.6),
                  },
                ]}
                key={i}
                onPress={() => setIndex(i)}>
                <Animated.Text
                  style={[
                    inputRange.map((inputIndex: any) => inputIndex === i && !isDefault && styles.viewActive),
                    { opacity, color },
                    !isDefault && styleGlobal.padding_10,
                  ]}>
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
          {isShare && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleShare}
              style={[styles.viewButtonShare, { backgroundColor: Colors.primary }]}>
              <View style={styleGlobal.padding_7}>
                <IconShare fill={Colors.white} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [isShare, handleShare, isDefault],
  );

  return (
    <View style={[styles.container]}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default React.memo(TabsMenu);

const styles = StyleSheet.create({
  container: { height: '100%', backgroundColor: Colors.white },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: hexToRgba(Colors.black, 0.2),
  },
  viewActive: {
    fontWeight: '700',
    color: Colors.primary,
  },
  viewNoActive: {
    fontWeight: '700',
    color: Colors.textColor,
  },
  viewButtonShare: {
    borderRadius: 6,
  },
});
