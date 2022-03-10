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
import { useTheme } from '@react-navigation/native';
import IconBack from '../../assets/iconSVG/IconBack';
import IconMenu from '../../assets/iconSVG/IconMenu';
import LottieView from 'lottie-react-native';



const RenderLeftBack = ({ navigation,onPressLeft, Style, brandTheme, left,menu }) => {

  const { colors } = useTheme();

  function handleBack() {
    navigation.goBack(null);
  }

  function handleOpenMenuDrawer() {
    navigation.openDrawer();
  }
  console.log('menuuu',menu,left)

  return (
    <TouchableOpacity
      style={[{
        width: scale(32),
        height: verticalScale(32),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1e3,
      }, Style]}
      onPress={onPressLeft ? onPressLeft: menu ? handleOpenMenuDrawer:handleBack}
    >
    {left === true && !menu &&(
      <IconBack width={scale(32)} height={verticalScale(32)} fill={brandTheme?.blue02?? colors?.blue02} />
    )}
    {left !== true&&(
      <ImageResize source={left} height={verticalScale(28)} width={scale(28)} />
    )}
    
    {menu && left &&(
      <LottieView source={require('../../assets/animationsLottie/menu.json')} autoPlay loop />
    )}

    {/* <ImageResize source={left !== true ? left : Back} height={verticalScale(menu?28:20)} width={scale(menu?28:20)} /> */}
    
    </TouchableOpacity>
  );
};

const RenderRightBack = ({ navigation,onPressRight, Style, brandTheme, IconRight,menu }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[{
        width: scale(32),
        height: verticalScale(32),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1e3,
      }, Style]}
      onPress={onPressRight}
    >
    <LottieView source={IconRight} autoPlay loop style={{ width: scale(32),height:verticalScale(32) }} />
    {/* <IconRight width={scale(32)} height={verticalScale(32)} fill={brandTheme?.blue02?? colors?.blue02} /> */}
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
        <Logo width={scale(120)} height={verticalScale(17)} />
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
                <RenderLeftBack left={childrenLeft} onPressLeft={onPressLeft} menu={menu} brandTheme={brandTheme} navigation={navigation}/>
              )}
              
              <RenderBody body={body} />

              {childrenRight && (
                <RenderRightBack IconRight={childrenRight} onPressRight={onPressRight} brandTheme={brandTheme} navigation={navigation}/>
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
