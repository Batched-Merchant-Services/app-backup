import React, { Fragment, useEffect, useState } from 'react';

import {
  Text,
  View,
  Divider,
  ImageResize
} from '@components';
import { TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';
import InputError from '@components/FloatingLabelInput/InputError';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setFile } from '../../store/actions/user.action';
import { convertImage } from '@utils/formatters';

import styles from './styles';
import Colors from '@styles/Colors';


const options = {
  title: 'Choose an Image',
  includeBase64: true
};


const ImageUploadPiker = ({ value, error, onChangeText, navigation, label, imageEmpty, typeImage, onPressTerm, onPressPrivacy, ...props }) => {


  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux?.user;
  const brandTheme = userData?.Theme?.colors;
  const [singleFile, setSingleFile] = useState(null);
  const [fileError, setFileError] = useState('pending');

  const errorFile = useSelector(state => state?.user?.showErrorFile);

  useEffect(() => {
    setFileError(fileError)
  }, [fileError])

  const uploadImage = async (fileBase64, typeImage) => {
    const resultBase = await convertImage(fileBase64);
    const nameFile = fileBase64?.name;
    dispatch(setFile({ nameFile, resultBase }));
    if (errorFile) {
      setFileError('Imagen rechazada, favor de volver a tomarla.');
    }
    switch (typeImage) {
      case 'front':
        onChangeText(userData?.setFile)
        setFileError(null);
      case 'back':
        onChangeText(userData?.setFile)
        setFileError(null);
      case 'address':
        onChangeText(userData?.setFile)
        setFileError(null);
      default:
        onChangeText(userData?.setFile)
        setFileError(null);
    }
  };


  function handleImages(value) {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        setFileError(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button:', response.customButton);
      } else {
        if (response.assets) {
          const source = { uri: 'data:image/jpeg;base64,' + response?.assets[0]?.base64, name: response?.assets[0]?.fileName }
          uploadImage(source, value);
        }
      }
    });
  }

  function handleImagesSelfie(value) {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        setFileError(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button:', response.customButton);
      } else {
        if (response.assets) {
          const source = { uri: 'data:image/jpeg;base64,' + response?.assets[0]?.base64, name: response?.assets[0]?.fileName }
          uploadImage(source, value);
        }
      }
    });
  }

  return (
    <Fragment>
      <View blue02 padding-5>
        <Text h12 white semibold>{label}</Text>
      </View>
      <TouchableOpacity onPress={() => typeImage === 'selfie' ? handleImagesSelfie(typeImage) : handleImages(typeImage)}>
        <View flex-1 centerH centerV height-160 textBlue01 style={fileError === 'pending' ? { borderColor: Colors.blue02, borderWidth: 1 } : fileError ? { borderColor: brandTheme?.error ?? Colors.error, borderWidth: 1 } : { borderColor: brandTheme?.success ?? Colors.success, borderWidth: 1 }}>
          <ImageResize
            source={value ? { uri: value } : imageEmpty}
            width={value ? '80%' : scale(130)}
            height={value ? '80%' : verticalScale(130)}
          />
        </View>
      </TouchableOpacity>
      <Divider width-5 />
      <InputError error={fileError} />
    </Fragment>

  );
}


export default ImageUploadPiker;