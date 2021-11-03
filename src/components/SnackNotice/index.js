import React,{useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Divider } from '@components';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '@utils/i18n';
import { useDispatch, useSelector } from "react-redux";
import Colors from '@styles/Colors';
import { toggleSnackbarClose, toggleSnackbarOpen } from '../../store/actions/app';

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

  useEffect(() => {
    if (visible) {
      dispatch(toggleSnackbarOpen(message));
    }else{
      dispatch(toggleSnackbarClose());
    }

  }, []);




if (SHOW) {
  return (
    <View
      style={[styles.offlineContainer,{backgroundColor:Colors.error}]} 
    >
        <View row>
          <View flex-1 paddingL-15 centerV>
            <Text h12>
              {message}
            </Text>
          </View>
          <Divider width-20 />
          <View
            style={{ flex: 0.5, alignItems: 'flex-end' }}
            centerV
            paddingR-15
          >
            <TouchableOpacity onPress={handleClose}>
              <Text h12 bold>
                CLOSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>

  )

}
return null
    
};

export default SnackNotice;
