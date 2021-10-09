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
      <View row bottom>
        <Link onPress={onPressTerm}>
          <Text h12 white>{i18n.t('General.linkTermsAndConditions')}</Text>
        </Link>
        <Divider width-10 />
        <Link onPress={onPressPrivacy}>
          <Text h12 white>{i18n.t('General.linkPrivacyPolicy')}</Text>
        </Link>
      </View>
      <Divider height-10/>
    </Fragment>
    
  );
}


export default LinksTerms;