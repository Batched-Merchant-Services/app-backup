import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Divider,ImageResize } from '@components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '@utils/i18n';
import { useDispatch, useSelector } from "react-redux";
import Colors from '@styles/Colors';
import { toggleSnackbarClose, toggleSnackbarOpen } from '@store/actions/app.actions';
import { scale, verticalScale } from 'react-native-size-matters';
import IconWarning from '@assets/iconSVG/IconWarning';

import close from '@assets/icons/white-x.png';

const SnackNotice = ({
  message,
  timeout,
  visible,
  style = {}
}) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const appData = redux.app;
  const brandTheme = appData?.Theme?.colors;

  const SHOW = useSelector(state => state?.app?.toggleSnackbar);
  const MESSAGE = useSelector((state) => state?.app?.snackbarMessage);

  const TIME = (timeout - 500) / 1000 + "s";


  let TIMER;
  function handleTimeout() {
    TIMER = setTimeout(() => {
      dispatch(toggleSnackbarClose());
    }, timeout);
  }

  function handleClose() {
    dispatch(toggleSnackbarClose());
  }

//   useEffect(() => {
//     if (visible) {
//       dispatch(toggleSnackbarOpen(message));
//     } else {
//       dispatch(toggleSnackbarClose());
//     }

//   }, []);


  if (SHOW || visible) {
    return (
      <View centerH>
        <View
          style={[styles.offlineContainer, { backgroundColor: Colors.error }]}
        >
          <View row>
            <View  centerH centerV paddingL-15 >
            <IconWarning width={scale(12)} height={verticalScale(12)}  fill={brandTheme?.white??Colors?.white} fillSecondary={brandTheme?.warning??Colors?.warning}/>
            </View>
            <View flex-1 paddingL-15 centerV>
              <Text h12>
                {message?message?.toString():MESSAGE?.toString()}
              </Text>
            </View>
            <Divider width-20 />
            <View
              style={{  alignItems: 'flex-end' }}
              centerV
              paddingR-15
            >
              <TouchableOpacity onPress={handleClose}>
                <ImageResize
                  source={close}
                  height={verticalScale(10)}
                  width={scale(10)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View row style={{width:'100%'}}>
        <View style={{borderBottomLeftRadius:5}} flex-1 height-4 white/>
        <View  style={{borderBottomRightRadius:5}} flex-1 height-4 error/>
        </View>
      </View>


    )

  }
  return null

};

export default SnackNotice;
