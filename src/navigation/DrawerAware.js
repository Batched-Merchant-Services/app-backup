import React from 'react';
import {
  Text
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from './styles';

const {
  interpolate,
  Extrapolate
} = Animated;

const CustomDrawer = props => {
  const { state, progress, navigation } = props;
  const { index, routes } = state;

  const opacity = interpolate(props.progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.1, 1],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <Animated.View style={[
      Styles.containerSideMenu]}>
      <SafeAreaView style={Styles.imageContainer} edges={['top']}>
      <DrawerContentScrollView {...props} contentContainerStyle={Styles.drawerContentContainerStyle}>
        {routes.map((route, position) => {
          const isFocused = (index === position);

          return (
            <DrawerItem
              key={route.key}
              label={({ focused }) => {
                return (
                  <Text style={focused ? Styles.activeText : Styles.inactiveText}>
                    {route.name}
                  </Text>
                )
              }}
              style={isFocused ? Styles.activeContainer : Styles.inActiveContainer}
              onPress={() => navigation.navigate(`${route.name}`)}
              focused={isFocused}
              activeBackgroundColor='transparent'
            />
          )
        })}
      </DrawerContentScrollView>
      </SafeAreaView>
    </Animated.View>
  )
};

export default CustomDrawer;


