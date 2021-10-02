import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text, ImageResize, View, Divider } from '@components';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import Logo from '@assets/brandBatched/logo.svg';
const Back = require('@assets/icons/backBlue.png');


const RenderBack = ({ onPressRight, Style, brandTheme, right, left }) => {
  return (
    <TouchableOpacity
      style={[{
        width: scale(32),
        height: verticalScale(32),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1e3,
        borderColor: brandTheme?.textBlueDark ?? Colors?.blue02,
        borderWidth: 1
      }, Style]}
      onPress={onPressRight}
    >
    <ImageResize source={right ? right : left ? left : Back} height={verticalScale(20)} width={scale(20)} />
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


const NavigationBar = ({ navigation, onPressRight, body, childrenLeft, childrenRight, showNavigation, ...props }) => {

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
                <RenderBack left={childrenLeft} onPressRight={() => navigation.goBack()} />
              )}
              <RenderBody body={body} />
              {childrenRight && (
                <RenderBack right={childrenRight} onPressRight={onPressRight} />
              )}
            </View>
          </View>
          <Divider height-20 />
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
