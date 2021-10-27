import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  StepIndicator,
  FloatingInput,
  ButtonRounded,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { useSelector } from 'react-redux';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import Styles from './styles'
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import { verticalScale } from 'react-native-size-matters';
import menu from '@assets/icons/hamburgerMenu.png';

const HomeContact = ({ navigation, navigation: { goBack } }) => {

  const [items, setItems] = useState([
    { id: '1', value: 'Licenses activation', name: 'Licenses activation' },
    { id: '2', value: 'Licenses activation', name: 'Licenses activation' }
  ]);
  const reason = useValidatedInput('select', {
    changeHandlerSelect: 'onSelect'
  });
  const note = useValidatedInput('note', '');


  //const isValid = isFormValid(firstName, mediumName, lastName, ssn, gender, birthDay);
  return (
    <BackgroundWrapper showNavigation={true} childrenLeft={menu} menu navigation={navigation}>
      <Text h16 blue02 regular>{i18n.t('contact.textContactUs')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('contact.textFillUpTheForm')}</Text>
      <Divider height-10 />
      <DropDownPicker
        {...reason}
        label={i18n.t('contact.textReason')}
        options={items}
      //onFill={(code)=> filterPays(code)}
      />
      <Divider height-10 />
      <FloatingInput
        {...note}
        label={i18n.t('contact.textNote')}
        autoCapitalize={'none'}
        multiline
        styleMultiline={{ height:verticalScale(200)}}
      />
      <Divider height-10 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={() => { navigation.navigate('SignIn', {
            screen: 'ConfirmationContact'})
           }}
          //disabled={!isValid}
          blue
        >
          <Text h14 white semibold>
            {i18n.t('contact.buttonSendMessage')}
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-10 />
      <Text h10 white light>Morbi aliquam nisi diam, vitae laoreet neque ultrices sed. Maecenas at dui auctor arcu condimentum congue. Duis vel ligula in felis cursus pellentesque. Nam tellus tellus, gravida ut luctus a, pellentesque nec est.</Text>
      <Divider height-20 />
    </BackgroundWrapper>
  );
}


export default HomeContact;