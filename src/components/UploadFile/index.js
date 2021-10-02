import React, { Fragment, useEffect,useState } from 'react';

import {
  Text,
  View,
  Divider,
  ImageResize,
  ButtonRounded
} from '@components';
import { scale,verticalScale } from 'react-native-size-matters';
import { useValidatedInput } from '@hooks/validation-hooks';
import DocumentPicker from 'react-native-document-picker';
import styles from './styles';
import Colors from '@styles/Colors';

import check from '@assets/icons/white-check.png';
import close from '@assets/icons/white-x.png';


const UploadFile = ({ navigation,labelInput,labelButton,onPressTerm, onPressPrivacy, ...props }) => {
  const fileUpload = useValidatedInput('fileUpload', '');
  const [singleFile, setSingleFile] = useState(null);
  const [fileError, setFileError] = useState(false);

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      // Please change file upload URL
      let res = await fetch(
        'http://localhost/upload.php',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: DocumentPicker.types.allFiles,
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      // Setting the state to show single file attributes
      setSingleFile(res[0]);
    } catch (err) {
      setSingleFile(null);
      setFileError(true)
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
      <View style={styles.mainBody}>
      <View paddingL-10 height-40 width-310 centerV style={{ borderColor:Colors.blue02,borderWidth:1}}>
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
          size='lg'
        >
          <Text h14 semibold blue02>
            {singleFile != null ?'Choose file':'Choose file'}
          </Text>
        </ButtonRounded>
    </View>
    
  );
}


export default UploadFile;