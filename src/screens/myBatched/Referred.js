import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewBase } from 'react-native';
import { View, Text, Divider, ImageResize, ButtonRounded, DropDownPicker } from '@components';
import { useValidatedInput, isFormValid } from '@hooks/validation-hooks';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import whiteWallet from '@assets/icons/white-wallet.png';
import blueReferred from '@assets/icons/blue-referred.png';
import blueRow from '@assets/icons/blue-row-double-down.png';
import EmptyState from '../EmptyState';
import Styles from './styles';
import i18n from '@utils/i18n';

const Referred = ({ navigation, step, onPress, label }) => {
  const dispatch = useDispatch();
  const redux = useSelector(state => state);
  const dataUser = redux?.user;
  const userProfile = dataUser?.dataUser?.usersProfile ?dataUser?.dataUser?.usersProfile[0]:''
  const accounts = userProfile?.accounts
  const dateSelect =useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const levelSelect =useValidatedInput('select', '',{
    changeHandlerSelect: 'onSelect'
  });
  const [showImageProfile, setShowImageProfile] = useState(false);
  const [showData, setShowData] = useState(false);
  const [dataInfo, setDataInfo] = useState('');
  const [idUulala, setIdUulala] = useState('');
  const [nameData, setNameData] = useState('');
  const [alias, setAlias] = useState('');
  const [imageData, setImageData] = useState('');
  const [levelData, setLevelData] = useState('');
  const [incomeData, setIncomeData] = useState('');
  const [dataReferred, setDataReferred] = useState('');

  useEffect(() => {
    if (dataUser?.dataUser?.licensesReferences) 
      if (dataUser?.dataUser?.licensesReferences.length > 0) {
        setShowData(true);
        dataUser?.dataUser?.licensesReferences.forEach(reference2 => {
          console.log('reference2',reference2)
  
        });
        setDataInfo(dataUser?.dataUser?.licensesReferences);
      }
      else setShowData(false);

  }, []);


  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  console.log('dataUser',dataUser);

  return (
    <View flex-1>
      <View row>
        <View flex-1>
          <Text h14 blue02 light>{i18n.t('home.referred.textMyReferrenceCode')}</Text>
          <Text h13 green semibold>{accounts?.id}</Text>
        </View>
        <View>
          <ButtonRounded
            disabled={false}
            green
          >
            <Text h11 semibold white>
              {i18n.t('home.referred.buttonCopyCode')}
            </Text>
          </ButtonRounded>
        </View>
      </View>
      {!showData && (
        <EmptyState />
      )}

      {showData && (
        <>
          <Divider height-25 />
          <View flex-1 row>
            <View centerV>
              <Text h12 regular white>{i18n.t('home.referred.textMyReferredUsers')}</Text>
            </View>
            <Divider width-10 />
            <View flex-1>
              <ButtonRounded
                disabled={false}
                dark
              >
                <View row>
                  <>
                    <Text h14 light blue02>
                      {i18n.t('home.referred.dropDownDate')}
                    </Text>
                    <Divider width-10 />
                    <Text blue02 h14>▼</Text>
                  </>
                </View>
              </ButtonRounded>
            </View>
            <Divider width-10 />
            <View flex-1>
              <ButtonRounded
                disabled={false}
                dark
              >
                <View row>
                  <>
                    <Text h14 light blue02>
                      {i18n.t('home.referred.dropDownLevel')}
                    </Text>
                    <Divider width-10 />
                    <Text blue02 h14>▼</Text>
                  </>
                </View>
              </ButtonRounded>
            </View>
          </View>
          <Divider style={Styles.borderDoted} />
          <Divider height-10 />
          <View style={Styles.borderViewDoted} padding-15>
            <View row>
              <View flex-1 >
                <Text h12 light blue02>{i18n.t('General.textUulalaId')} IMCG4WHEIILNM</Text>
                <Text h12 semibold>Victor Urquides Torres</Text>
              </View>
              {showImageProfile && (
                <View width-35 height-34 centerH centerV style={Styles.borderImages}>
                  <ImageResize
                    source={blueRow}
                    height={verticalScale(16)}
                    width={scale(14)}
                  />
                </View>
              )}
              {!showImageProfile && (
                <View width-35 height-34 centerH centerV style={{ backgroundColor: generateColor() }}>
                  <Text h16 white bold>VU</Text>
                </View>
              )}
            </View>
            <Divider height-10 />
            <View row >
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textLevel')}</Text>
                <Text h12 white regular>First</Text>
              </View>
              <View marginH-15>
                <Text h12 blue02 light>{i18n.t('home.referred.textIncome')}</Text>
                <Text h12 white regular>30%</Text>
              </View>
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textReferred')}</Text>
                <Text h12 white regular>06/08/2023 12:43</Text>
              </View>
            </View>
          </View>
          <Divider height-10 />
          <View style={Styles.borderViewDoted} padding-15>
            <View row>
              <View flex-1 >
                <Text h12 light blue02>Uulala ID: IMCG4WHEIILNM</Text>
                <Text h12 semibold>Urbano Ballesteros Hernández</Text>
              </View>
              {showImageProfile && (
                <View width-35 height-34 centerH centerV style={Styles.borderImages}>
                  <ImageResize
                    source={blueRow}
                    height={verticalScale(16)}
                    width={scale(14)}
                  />
                </View>
              )}

              {!showImageProfile && (
                <View width-35 height-34 centerH centerV style={{ backgroundColor: generateColor() }}>
                  <Text h16 white bold>UB</Text>
                </View>
              )}
            </View>
            <Divider height-10 />
            <View row >
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textLevel')}</Text>
                <Text h12 white regular>First</Text>
              </View>
              <View marginH-15>
                <Text h12 blue02 light>{i18n.t('home.referred.textIncome')}</Text>
                <Text h12 white regular>30%</Text>
              </View>
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textReferred')}</Text>
                <Text h12 white regular>06/08/2023 12:43</Text>
              </View>
            </View>
          </View>
          <Divider height-10 />
          <View style={Styles.borderViewDoted} padding-15>
            <View row>
              <View flex-1 >
                <Text h12 light blue02>Uulala ID: IMCG4WHEIILNM</Text>
                <Text h12 semibold>Guadalupe Torres Puentes</Text>
              </View>
              {showImageProfile && (
                <View width-35 height-34 centerH centerV style={Styles.borderImages}>
                  <ImageResize
                    source={blueRow}
                    height={verticalScale(16)}
                    width={scale(14)}
                  />
                </View>
              )}

              {!showImageProfile && (
                <View width-35 height-34 centerH centerV style={{ backgroundColor: generateColor() }}>
                  <Text h16 white bold>GT</Text>
                </View>
              )}
            </View>
            <Divider height-10 />
            <View row >
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textLevel')}</Text>
                <Text h12 white regular>First</Text>
              </View>
              <View marginH-15>
                <Text h12 blue02 light>{i18n.t('home.referred.textIncome')}</Text>
                <Text h12 white regular>30%</Text>
              </View>
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textReferred')}</Text>
                <Text h12 white regular>06/08/2023 12:43</Text>
              </View>
            </View>
          </View>
          <Divider height-10 />
          <View style={Styles.borderViewDoted} padding-15>
            <View row>
              <View flex-1 >
                <Text h12 light blue02>Uulala ID: IMCG4WHEIILNM</Text>
                <Text h12 semibold>Fernando Moráles Gonzáles</Text>
              </View>
              {showImageProfile && (
                <View width-35 height-34 centerH centerV style={Styles.borderImages}>
                  <ImageResize
                    source={blueRow}
                    height={verticalScale(16)}
                    width={scale(14)}
                  />
                </View>
              )}

              {!showImageProfile && (
                <View width-35 height-34 centerH centerV style={{ backgroundColor: generateColor() }}>
                  <Text h16 white bold>FM</Text>
                </View>
              )}
            </View>
            <Divider height-10 />
            <View row >
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textLevel')}</Text>
                <Text h12 white regular>First</Text>
              </View>
              <View marginH-15>
                <Text h12 blue02 light>{i18n.t('home.referred.textIncome')}</Text>
                <Text h12 white regular>30%</Text>
              </View>
              <View>
                <Text h12 blue02 light>{i18n.t('home.referred.textReferred')}</Text>
                <Text h12 white regular>06/08/2023 12:43</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Referred;
