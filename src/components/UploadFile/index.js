import React, {useState } from 'react';

import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded
} from '@components';

import { useSelector, useDispatch } from 'react-redux';
import { scale,verticalScale } from 'react-native-size-matters';
import DocumentPicker from 'react-native-document-picker';
import styles from './styles';
import Colors from '@styles/Colors';

import check from '@assets/icons/white-check.png';
import close from '@assets/icons/white-x.png';
import { setFile } from '../../store/actions/user.action';
import { convertImage } from '@utils/formatters';
import i18n from '@utils/i18n';

const UploadFile = ({ value, error, onChangeText,navigation,labelInput,labelButton,onPressTerm, onPressPrivacy, ...props }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const userData = redux?.user;
  const [singleFile, setSingleFile] = useState(null);
  const [fileError, setFileError] = useState(false);

  const uploadImage = async (fileBase64) => {
  
      const resultBase = await convertImage(fileBase64);
      const nameFile = fileBase64?.name;
      dispatch(setFile({ nameFile, resultBase }));
      onChangeText(userData?.setFile);
   
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.allFiles,
      });
      setSingleFile(res[0]);
      const fileBase64 = res[0];
      uploadImage(fileBase64);

    } catch (err) {
      setSingleFile(null);
      setFileError(true)
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  return (
      <View style={styles.mainBody}>
      <View paddingL-10 height-40  centerV style={{ borderColor:Colors.blue02,borderWidth:1}}>
        <View style={{flexDirection:'row',justifyContents:'space-between'}}>
          <View flex-1 centerV >
            <Text  h12 regular blue02>
              {singleFile != null ? singleFile?.name :'PNG, JPG, PDF (Less than 1 MB)' }
            </Text>
          </View>
          {singleFile != null &&(
            <View height-34 width-34 blue02 centerH centerV>
              <ImageResize
                source={fileError?close:check}
                height={verticalScale(12)}
                width={scale(16)}
              />
            </View>
          )} 
        </View>
      </View>
      <Divider height-10 />
        <ButtonRounded
          onPress={selectFile}
          disabled={false}
          dark
        >
          <Text h14 semibold blue02>
            {singleFile != null ?i18n.t('Licenses.textChooseFile'):i18n.t('Register.textChooseFile')}
          </Text>
        </ButtonRounded>
    </View>
    
  );
}


export default UploadFile;