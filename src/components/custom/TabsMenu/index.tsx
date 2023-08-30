import IconShare from 'assets/icons/icon_share';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import Colors from 'themes/Color';
import { heightFull, styleGlobal } from 'types/StyleGlobal';
import { IRouterTabsMenu } from 'types/product-types';
import { hexToRgba } from 'utils';

interface IProps {
  routerTabs: IRouterTabsMenu[];
  SceneMapTabs: {
    [key: string]: React.ComponentType<unknown>;
  };
  isShare?: boolean;
  handleShare?: () => void;
}

const TabsMenu: React.FC<IProps> = ({ routerTabs, SceneMapTabs, isShare, handleShare }) => {
  const layout = useWindowDimensions();

  const renderScene = SceneMap(SceneMapTabs);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(routerTabs);

  const renderTabBar = React.useCallback(
    (props: any) => {
      const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
      return (
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
                style={[
                  styles.tabItem,
                  {
                    backgroundColor:
                      props?.navigationState?.index === i ? Colors.primary : hexToRgba(Colors.primary, 0.6),
                  },
                ]}
                key={i}
                onPress={() => setIndex(i)}>
                <Animated.Text
                  style={[
                    inputRange.map((inputIndex: any) => inputIndex === i && styles.viewActive),
                    { opacity, color },
                    styleGlobal.padding_10,
                  ]}>
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
          {isShare && (
            <TouchableOpacity activeOpacity={0.9} onPress={handleShare} style={styles.viewButtonShare}>
              <View style={styleGlobal.padding_7}>
                <IconShare fill={Colors.white} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [isShare, handleShare],
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
  container: { height: heightFull, backgroundColor: Colors.white },
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
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
});
