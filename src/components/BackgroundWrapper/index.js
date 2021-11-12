import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from "react-native-linear-gradient";
import Colors from "@styles/Colors";
import { useSelector } from "react-redux";
import { StatusBar, useColorScheme, ScrollView, Platform } from 'react-native';
import Styles from './styles'
import { Divider, Text, LinksTerms, NavigationBar, View } from "@components";
const BackgroundWrapper = ({
  children,
  forceInset,
  keyboardAware = true,
  navigation,
  showNavigation = false,
  onPressLeft,
  onPressRight,
  menu,
  childrenLeft,
  childrenRight,
  ...props
}) => {
  const redux = useSelector((state) => state);
  const userData = redux.user;
  const brandTheme = userData?.Theme?.colors;
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1
  };

  return (
    <LinearGradient
      colors={[Colors.background, Colors.blue04]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.9, 1]}
      style={[Styles.linearGradient]}
    >
      <SafeAreaView style={Styles.AndroidSafeArea} forceInset={{ bottom: 'never'}}>
        <StatusBar backgroundColor={Colors.background} barStyle={"light-content"} />
        <NavigationBar showNavigation={showNavigation} childrenLeft={childrenLeft} menu={menu} onPressLeft={onPressLeft} onPressRight={onPressRight} childrenRight={childrenRight} navigation={navigation} />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
            {children}
        </ScrollView>
        <Divider style={{ height: Platform.OS === 'ios' ? 15 : 30}}/>
        {/* <LinksTerms /> */}
      </SafeAreaView>
    </LinearGradient>
  );
};

BackgroundWrapper.propTypes = {
  children: PropTypes.any,
};

export default BackgroundWrapper;
