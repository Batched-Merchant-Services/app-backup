import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Divider,
  SnackNotice,
  FloatingInput,
  ButtonRounded,
  DropDownPicker,
  BackgroundWrapper
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { useValidatedInput,isFormValid } from '@hooks/validation-hooks';
import Styles from './styles'
import i18n from '@utils/i18n';
import menu from '@assets/icons/hamburgerMenu.png';
import { cleanContactError, setContact } from '../../store/actions/contact.actions';
import Loading from '../Loading';
import { verticalScale } from 'react-native-size-matters';

const HomeContact = ({ navigation, navigation: { goBack } }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile ? dataUser?.dataUser?.usersProfile[0] : ''
  const accounts = userProfile?.accounts;
  const clients = dataUser?.dataUser?.clients?dataUser?.dataUser?.clients[0]:dataUser?.dataUser?.clients;
  const contact = redux?.contact;

  const [items, setItems] = useState([
    { id: '1', value: 'Licenses activation', name: 'Licenses activation' },
    { id: '2', value: 'Licenses activation', name: 'Licenses activation' }
  ]);

  const reason = useValidatedInput('subject', '',{
    changeHandlerSelect: 'onSelect'
  });

  const note = useValidatedInput('message', '');
  const isValid = isFormValid(reason,note);
  const error = useSelector(state => state?.contact?.showContactError);

  useEffect(() => {
    dispatch(cleanContactError())
  }, [dispatch,contact?.successContact])

  function handlePressSetContact() {
    const subjects = reason?.value;
    const dataContact = {
      email: accounts?.email,
      subject: subjects?.value,
      message: note?.value,
      clientId: accounts?.clientId,
      clientName: `${accounts?.firstName} ${accounts?.lastName} ${accounts?.secondLastName}`,
      clientPhone: accounts?.phoneNumber,
      clientCompany: clients?.companies[0]?.name,
      template: 'batched_contact_client'
    }
    dispatch(setContact({dataContact}))
  }

  

  if (contact?.successContact) {
    navigation.navigate('ConfirmationContact')
  }

  
  return (
    <BackgroundWrapper showNavigation={true} childrenLeft menu navigation={navigation}>
      <Text h16 blue02 regular>{i18n.t('contact.textContactUs')}</Text>
      <Divider height-10 />
      <Text h12 white light>{i18n.t('contact.textFillUpTheForm')}</Text>
      <Divider height-10 />
      <FloatingInput
        {...reason}
        label={i18n.t('contact.textReason')}
        autoCapitalize={'none'}
      />
      <Divider height-10 />
      <FloatingInput
        {...note}
        label={i18n.t('contact.textNote')}
        autoCapitalize={'none'}
        multiline
      />
      <Divider height-10 />
      <View flex-1 bottom>
        <ButtonRounded
          onPress={handlePressSetContact}
          disabled={!isValid}
          blue
        >
          <Text h14 white semibold>
            {i18n.t('contact.buttonSendMessage')}
          </Text>
        </ButtonRounded>
      </View>
      <Divider height-20 />
      <Loading modalVisible={contact?.isLoadingContact} />
      <View flex-1 bottom>
        <SnackNotice
          visible={error}
          message={contact?.error?.message}
          timeout={3000}
        />
      </View>
    </BackgroundWrapper>
  );
}


export default HomeContact;