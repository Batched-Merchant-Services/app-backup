import React, { Fragment } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import Colors from '@styles/Colors';
import { View, Text, ButtonRounded,Divider } from '@components';
import { useSelector } from 'react-redux';
import Styles from '../styles';
import { ImageBackground,TouchableOpacity } from 'react-native';
import fillPoint from '@assets/icons/fillPoint.png';
import i18n from '@utils/i18n';

const BoxLicenses = ({
  numberLicense,
  pricingLicense,
  percentPoint,
  green,
  blue,
  blueDark,
  children,
  style = {},
  containerStyle = {},
  onPress,
  ...props
}) => {
  const redux = useSelector(state => state);
  const appData = redux.user;
  const brandTheme = appData?.Theme?.colors;

  const blueColor = [brandTheme?.blue02 ?? Colors.blue02, brandTheme?.blue04 ?? Colors.blue04];

  const greenColor = [brandTheme?.success ?? Colors.success,brandTheme?.green ?? Colors.green];

  const darkBlueColor = [brandTheme?.blue04 ?? Colors.blue04,brandTheme?.blue03 ?? Colors.blue03];




  let backgroundGradient;
  let colorLine;
  let button;
  switch (true) {
    case blue:
      backgroundGradient = blueColor;
      colorLine = brandTheme?.blue02 ?? Colors.blue02;
      blue;
      break;
    case green:
      backgroundGradient = greenColor;
      colorLine = brandTheme?.green ?? Colors.green;
      break;
    case blueDark:
      backgroundGradient = darkBlueColor;
      colorLine = brandTheme?.blue04 ?? Colors.blue04;
      break;
    default:
      backgroundGradient = blueColor;
      colorLine = brandTheme?.blue02 ?? Colors.blue02;
  }
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0.3 }}
      colors={backgroundGradient}
      style={[Styles.linearGradient, style]}
    >
    <ImageBackground source={fillPoint} resizeMode="cover" style={Styles.image}>
    <View flex-1 row centerV style={{justifyContent:'space-between'}}>
        <View flex-1 row>
          <Text white h50 bold>{numberLicense}</Text>
          <Divider width-5/>
          <View centerV>
            <Text white h15 regular>{i18n.t('Licenses.textPermanent')}</Text>
            <Text white h15 regular>{i18n.t('Licenses.textLicence')}</Text>
          </View>
          <View style={[Styles.lineDiv,{borderColor:colorLine}]}/>
        </View>
        <View flex-1 centerV>
          <Text h12 warning medium>{i18n.t('Licenses.textPricing')}<Text warning bold >{pricingLicense}</Text> USD </Text>
          <Text white h8>{i18n.t('Licenses.textGet')}<Text white bold >{percentPoint}% </Text>{i18n.t('Licenses.textDailyPointsReward')}</Text>
          <Divider height-8/>
          <TouchableOpacity
            style={[Styles.loginScreenButton,{ backgroundColor:colorLine}]}
            onPress={onPress}>
           <Text h14 semibold white>
              {i18n.t('Licenses.buttonSelect')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </LinearGradient>
  );
};

function getBtnSize(size) {
  const sizes = {
    lg: scale(320),
    md: scale(250),
    sm: scale(150),
  };
  return sizes[size];
}

export default BoxLicenses;
