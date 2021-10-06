import React, { useEffect,useState } from 'react';
import { StatusBar,useColorScheme,TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  Divider,
  ImageResize
} from '@components';
import ReactNativePinView from "react-native-pin-view"
//Redux
import { useSelector } from 'react-redux';
//Styles
import { scale,verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@styles/Colors';
//Images
import Back from '@assets/icons/backBlue.png';


const NewPin = ({ navigation,navigation: { goBack }  }) => {
  const redux = useSelector(state => state);
  const userData = redux?.user;
  const brandTheme = userData?.Theme?.colors;

  const onComplete= async (inputtedPin, clear) =>{
    const PinConfirm = inputtedPin;
    navigation.navigate("PinConfirmation")
   
  };
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex:1,backgroundColor:brandTheme?.blue01??Colors.blue01}}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View flex-1 blue01 marginH-20>
      <View row centerV>
          <TouchableOpacity
            style={{
              width: scale(32),
              height: verticalScale(32),
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1e3,
              borderColor: Colors?.blue02,
              borderWidth: 1
            }}
            onPress={() => goBack()}
          >
            <ImageResize source={Back} height={verticalScale(20)} width={scale(20)} />
          </TouchableOpacity>
          <Divider width-30 />
          <View  centerH style={{ width: '70%'}}>
            <Text h18 blue04 medium center>Define a confirmation PIN</Text>
          </View>
        </View>
        <Divider height-20/>
        <Text h12 blue04 regular center>You will use it to confirm transactions and user validation.</Text>
        <Divider height-20/>
        <Text h12 blue04 regular center>6 Digits</Text>
        <Divider height-10/>
        <ReactNativePinView
          pinLength={6}
          showInputText={true}
          inputViewFilledStyle={{
              backgroundColor: "#FFF",
            }}
          buttonTextColor={brandTheme?.blue02??Colors.blue02}
          inputBgColor={brandTheme?.blue04??Colors.blue04}
          inputBgOpacity={0.8}
          inputActiveBgColor={brandTheme?.blue02??Colors?.blue02}
          onComplete={onComplete}
          keyboardViewStyle={{borderColor: brandTheme?.blue04??Colors.blue04,borderWidth:1, borderRadius:verticalScale(2)}}
          inputViewStyle={{width: verticalScale(20), height: verticalScale(20)}}
        // pinLength={6} // You can also use like that.
        />  
      </View>
    </SafeAreaView>


  );
}


export default NewPin;