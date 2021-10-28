import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, ImageResize, View, Divider } from '@components';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Logo from '@assets/brandBatched/logo.svg';
import Menu from '@assets/icons/hamburgerMenu.png';
import Back from '@assets/icons/backBlue.png';



const RenderLeftBack = ({ navigation,onPressLeft, Style, brandTheme, left,menu }) => {

  console.log('left',left)
  function handleBack() {
    navigation.goBack();
  }

  function handleOpenMenuDrawer() {
    navigation.openDrawer();
  }

  return (
    <TouchableOpacity
      style={[{
        width: scale(32),
        height: verticalScale(32),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1e3,
        borderColor: brandTheme?.textBlueDark ?? Colors?.blue02,
        borderWidth: menu? 0:1
      }, Style]}
      onPress={onPressLeft?onPressLeft:menu? handleOpenMenuDrawer:handleBack}
    >
    <ImageResize source={left !== true ? left : Back} height={verticalScale(menu?28:20)} width={scale(menu?28:20)} />
    </TouchableOpacity>
  );
};

const RenderRightBack = ({ navigation,onPressRight, Style, brandTheme, right,menu }) => {

  return (
    <TouchableOpacity
      style={[{
        width: scale(32),
        height: verticalScale(32),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1e3,
        borderColor: brandTheme?.textBlueDark ?? Colors?.blue02,
        borderWidth: menu? 0:1
      }, Style]}
      onPress={onPressRight}
    >
    <ImageResize source={right} height={verticalScale(20)} width={scale(20)} />
    </TouchableOpacity>
  );
};

const RenderBody = ({ body }) => {
  return (
    <View flex-1 centerH >
      {body && (
        <ImageResize source={body} height={verticalScale(20)} width={scale(20)} />
      )}
      {!body && (
        <Logo width={scale(120)} height={verticalScale(17)} fill="green" />
      )}
    </View>
  );
};


const NavigationBar = ({ navigation, onPressLeft,onPressRight, body, childrenLeft, childrenRight,menu,showNavigation, ...props }) => {

  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  return (
    <Fragment>
      {showNavigation === true && (
        <View>
          <View row {...props}>
            <View flex-1 row centerV>
              {childrenLeft && (
                <RenderLeftBack left={childrenLeft} onPressLeft={onPressLeft} menu={menu} navigation={navigation}/>
              )}
              
              <RenderBody body={body} />

              {childrenRight && (
                <RenderRightBack right={childrenRight} onPressRight={onPressRight} navigation={navigation}/>
              )}
            </View>
          </View>
          <Divider height-10 />
        </View>
      )}
    </Fragment>
  );
};

NavigationBar.propTypes = {
  onBack: PropTypes.func,
  body: PropTypes.any,
  withTransparency: PropTypes.bool
};

export default NavigationBar;
