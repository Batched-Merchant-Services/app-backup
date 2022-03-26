import React, { Fragment, useEffect, useState } from 'react';

import {
  Text,
  View,
  Divider,
  ImageResize
} from '@components';
import { TouchableOpacity,PermissionsAndroid } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';
import InputError from '@components/FloatingLabelInput/InputError';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setFile, setFileAddress, setFileBack, setFileFront, setFileSelfie } from '../../store/actions/user.action';
import { convertImage } from '@utils/formatters';
import { useTheme } from '@react-navigation/native';
import styles from './styles';
import Colors from '@styles/Colors';


const options = {
  title: 'Choose an Image',
  includeBase64: true
};

const optionsCamera = {
  title: 'Capture Photo',
  cancelButtonTitle   : 'Cancel',
  takePhotoButtonTitle: 'Capture Photo',
  includeBase64: true
};


const ImageUploadPiker = ({ value, error, onChangeText, navigation, label, ImageEmpty, typeImage, onPressTerm, onPressPrivacy, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux?.user;
  const brandTheme = userData?.Theme?.colors;
  const [fileError, setFileError] = useState('pending');
  const [typeImagesSend, setTypeImagesSend] = useState('');
  const [valueImages, setValueImages] = useState(value);
  const { colors } = useTheme();
  const errorFile = useSelector(state => state?.user?.showErrorFile);

  useEffect(() => {
    setFileError(fileError)
    onchangeSendImage();
  }, [fileError,userData])

  function onchangeSendImage( file ){
    if (typeImagesSend === 'front') {
      onChangeText(userData?.fileFront??'');
    }else if (typeImagesSend === 'back') {
      onChangeText(userData?.fileBack??'');
    }else if (typeImagesSend === 'address') {
      onChangeText(userData?.fileAddress??'');
    }else if (typeImagesSend === 'selfie') {
      onChangeText(userData?.fileSelfie??'');
    }
  }

  const uploadImage = async (fileBase64, typeImage) => {
    const resultBase = await convertImage(fileBase64);
    const nameFile = fileBase64?.name;
    setTypeImagesSend(typeImage)
    switch (typeImage) {
        case 'front':
          dispatch(setFileFront({ nameFile, resultBase }));
          setValueImages(fileBase64?.uri)
          setFileError(null);
          break;
        case 'back':
          dispatch(setFileBack({ nameFile, resultBase }));
          setValueImages(fileBase64?.uri);
          setFileError(null);
          break;
        case 'address':
          dispatch(setFileAddress({ nameFile, resultBase }));
          setValueImages(fileBase64?.uri);
          setFileError(null);
          break;
        case 'selfie':
          dispatch(setFileSelfie({ nameFile, resultBase }))
          setValueImages(fileBase64?.uri);
          setFileError(null);
          break;
        default:
          return typeImage;
      }
    if (errorFile) {
      setFileError('Imagen rechazada, favor de volver a tomarla.');
    }
  };


  function handleImages(valueImage) {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }else if (response.error) {
        setFileError(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button:', response.customButton);
      } else {
        if (response?.assets[0]?.fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
          if (response.assets) {
            const source = { uri: 'data:image/jpeg;base64,' +  response?.assets[0]?.base64, name: response?.assets[0]?.fileName }
            uploadImage(source, valueImage);  
          }
        }else{
          setFileError('Imagen rechazada, favor de volver a tomarla.');
        }
        
      }
    });
  }

  async function handleImagesSelfie(valueImage) {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message:"App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED ) {
      console.log("Camera & storage permission given");
      launchCamera(optionsCamera, (response) => {
        console.log('response',response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          setFileError(response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button:', response.customButton);
        } else {
          if (response?.assets[0]?.fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
            if (response.assets) {
              const source = { uri: 'data:image/jpeg;base64,' + response?.assets[0]?.base64, name: response?.assets[0]?.fileName }
              uploadImage(source, valueImage);
            }
          }else{
            setFileError('Imagen rechazada, favor de volver a tomarla.');
          }
        }
      });
    }
  }
  return (
    <Fragment>
      <View blue02 padding-5>
        <Text h12 white semibold>{label}</Text>
      </View>
      <TouchableOpacity onPress={() => typeImage === 'selfie' ? handleImagesSelfie(typeImage) : handleImages(typeImage)}>
        <View flex-1 centerH centerV height-160 textBlue01 style={fileError === 'pending' ? { borderColor: brandTheme?.blue02 ?? Colors.blue02, borderWidth: 1 } : fileError ? { borderColor: brandTheme?.error ?? Colors.error, borderWidth: 1 } : { borderColor: brandTheme?.success ?? Colors.success, borderWidth: 1 }}>
          {value !== '' &&(
            <ImageResize
            source={{uri: value}}
            width={'80%'}
            height={'80%'}
          />
          )}
           
          {value === '' &&(
            <ImageEmpty  height={'75%'} width={'75%'} fill={brandTheme?.blue02??colors.blue02}/>
          )}

          {value === undefined &&(
            <ImageEmpty  height={'75%'} width={'75%'} fill={brandTheme?.blue02??colors.blue02}/>
          )}
          
        </View>
      </TouchableOpacity>
      <Divider width-5 />
      <InputError error={fileError} />
    </Fragment>

  );
}


export default ImageUploadPiker;