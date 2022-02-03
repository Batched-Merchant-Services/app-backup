import React, { Fragment, useEffect,useState } from 'react';
import {
  Text,
  Link,
  View,
  Divider
} from '@components';
import i18n from '@utils/i18n';

const LinksTerms = ({ navigation,onPressTerm, onPressPrivacy, ...props }) => {
  
  return (
    <Fragment>
     <Text h10 blue01 light>{i18n.t('General.textAllRightsReserved')} Batched.com</Text>
      {/* <View row bottom>
        <Link onPress={onPressTerm}>
          <Text h12 white>{i18n.t('General.linkTermsAndConditions')}</Text>
        </Link>
        <Divider width-10 />
        <Link onPress={onPressPrivacy}>
          <Text h12 white>{i18n.t('General.linkPrivacyPolicy')}</Text>
        </Link>
      </View> */}
      <Divider height-5/>
    </Fragment>
    
  );
}


export default LinksTerms;