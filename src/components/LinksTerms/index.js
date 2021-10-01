import React, { Fragment, useEffect,useState } from 'react';
import {
  Text,
  Link,
  View,
  Divider
} from '@components';

const LinksTerms = ({ navigation,onPressTerm, onPressPrivacy, ...props }) => {
  
  return (
    <Fragment>
      <View row bottom>
        <Link onPress={onPressTerm}>
          <Text h12 white>Terms and Conditionsd</Text>
        </Link>
        <Divider width-10 />
        <Link onPress={onPressPrivacy}>
          <Text h12 white>Privacy Policy</Text>
        </Link>
      </View>
      <Divider height-10/>
    </Fragment>
    
  );
}


export default LinksTerms;