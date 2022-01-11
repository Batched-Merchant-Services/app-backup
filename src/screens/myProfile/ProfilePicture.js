import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Link,
  Divider,
  ImageResize,
  ButtonRounded,
  StepIndicator,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';
import upload from '@assets/icons/white-upload.png';
import Styles from './styles'
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import { TouchableHighlight } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { cleanDataFile, setFile } from '../../store/actions/user.action';
import { convertImage } from '@utils/formatters';
import { updateUserAvatar } from '../../store/actions/profile.actions';

const options = {
  title: 'Choose an Image',
  includeBase64: true
};

const ProfilePicture = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const [fileError, setFileError] = useState('pending');
  const [nameAvatar, setNameAvatar] = useState('pending');
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts;
  const errorFile = useSelector(state => state?.user?.showErrorFile);

  useEffect(() => {
    dispatch(cleanDataFile());
  }, [dispatch])

  useEffect(() => {
    profileUpdateAvatar();
  }, [dataUser?.setFile])

  const uploadImage = async (fileBase64) => {
    const resultBase = await convertImage(fileBase64);
    const nameFile = fileBase64?.name;
    console.log('resultBase',resultBase,'nameFile',nameFile)
    dispatch(setFile({ nameFile, resultBase }));
    setNameAvatar(fileBase64?.uri); 
    if (errorFile) {
      setFileError('Imagen rechazada, favor de volver a tomarla.');
    }
  };

  function profileUpdateAvatar() {
    dispatch(updateUserAvatar({id: accounts.id,image: dataUser?.setFile }))
  }

  function handleImages() {
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
          uploadImage(source);
        }
      }
    });
  }



  return (
    <BackgroundWrapper showNavigation={true} navigation={navigation} childrenLeft>
      <View flex-1 style={{ position: 'absolute', right: 0, top: 0 }}>
        <StepIndicator step={4} totalSteps={5} />
      </View>
      <Divider height-10 />
      <Text h14 blue02 regular>Profile picture:</Text>
      <View flex-1 centerH centerV>
        <View width-320 height-320 blue02 centerH>
          {accounts?.avatarImage !== '' &&  nameAvatar === 'pending' && (
            <ImageResize
              source={{ uri: accounts?.avatarImage }}
              height={verticalScale(320)}
              width={scale(320)}
            />
          )}

          {nameAvatar === '' && (
            <View flex-1 centerH centerV>
              <Text semibold white style={{ fontSize: 110 }}>{accounts?.alias}</Text>
            </View>
          )}
          {nameAvatar !== '' && (
            <ImageResize
              source={{ uri: nameAvatar }}
              height={'86%'}
              width={'90%'}
            />
          )}

          <TouchableHighlight style={[Styles.containerProfile, { backgroundColor: Colors.blue04 }]} onPress={handleImages} >
              <ImageResize
                source={upload}
                height={verticalScale(28)}
                width={scale(28)}
              />
            </TouchableHighlight>
        </View>

      </View>
      <View flex-1 bottom >
        <ButtonRounded
          onPress={() => {
            navigation.navigate('SignIn', {
              screen: 'BankInformation',
              merge: true
            });
          }}
          //disabled={!isValid}
          dark
        >
          <Text h14 blue02 semibold>
            {i18n.t('General.buttonNext')}
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-10 />
      <Text h10 white light>{i18n.t('General.textAllRightsReserved')}</Text>

    </BackgroundWrapper>
  );
}


export default ProfilePicture;