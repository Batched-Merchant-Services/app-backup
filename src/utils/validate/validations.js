import i18n from '@utils/i18n';
import { AsyncStorage } from 'react-native';


var Validations = [];
var mapValid = [];

(async () => {
  const lang = await AsyncStorage.getItem('lang');
  i18n.changeLanguage(lang);
  const md = await downloadedText();
  mapValid.push(md);
  const ld = mapValid?.map((i, index) => {
    const st = {...i}
    return st;
  })  
  Validations.push(ld[0]);
})();

async function downloadedText() { 
  const valid = {
     //GENERAL VALIDATIONS
     email: {
      presence: {
        message: i18n.t('validations.emailPresence')
      },
      format: {
        pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
        message: i18n.t('validations.emailFormat')
      }
    },
    password: {
      presence: {
        message: i18n.t('validations.passwordPresence')
      },
      length: {
        minimum: 8,
        maximum: 25,
        message: i18n.t('validations.passwordLength')
    },
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      message: i18n.t('validations.passwordFormat')
    }
  },
  confirmPassword: {
    presence: {
      message: i18n.t('validations.passwordPresence')
    },
    equality: {
      message: i18n.t('validations.passwordEquality')
    }
  },
  select:{
    presence: {
      message: i18n.t('validations.dropdownSelect')
    },
  },
  phone: {
    presence: {
      message: i18n.t('validations.phonePresence')
    },
    length: {
      minimum: 10,
      maximum: 25,
      message: i18n.t('validations.phoneLength')
    },
  },
  //SingUp
  sms: {
    presence: {
      message: i18n.t('validations.smsPresence')
    },
    length: {
      minimum: 6,
      maximum: 6,
      message: i18n.t('validations.smsLength')
    },
  },
  secretAnswers:{
    presence: {
      message: i18n.t('validations.secretAnswers')
    },
  },
  secretAnswerConfirm:{
    presence: {
      message: i18n.t('validations.secretAnswerConfirm')
    },
    equality: {
      message: i18n.t('validations.secretAnswersEquality')
    }
  },
  pinCode: {
    presence: {
      message: i18n.t('validations.loginCode')
    },
    format: {
      pattern: /^[0-9]{6}$/,
      message: i18n.t('validations.loginCodeFormat')
    }
  },
  firstName:{
    presence: {
      message: i18n.t('validations.firstName')
    },
  },
  lastName:{
    presence: {
      message: i18n.t('validations.lastName')
    },
  },
  ssn:{
    presence: {
      message: i18n.t('validations.ssn')
    },
  },
  birthDay:{
    presence: {
      message: i18n.t('validations.birthDay')
    },
  },
  postalCode:{
    presence: {
      message: i18n.t('validations.postalCode')
    },
  },
  suburb:{
    presence: {
      message: i18n.t('validations.suburb')
    },
  },
  city:{
    presence: {
      message: i18n.t('validations.city')
    },
  },
  state:{
    presence: {
      message: i18n.t('validations.state')
    },
  },
  street:{
    presence: {
      message: i18n.t('validations.street')
    },
  },
  number:{
    presence: {
      message: i18n.t('validations.number')
    },
  },
  gender: {
    presence: {
      message: i18n.t('validations.dropdownSelect')
    }
  },
  transactionId:{
    presence: {
      message: i18n.t('validations.transactionId')
    },
  },
  transactionIdBTC:{
    presence: {
      message: i18n.t('validations.transactionId')
    },
    format: {
      pattern: /^[a-fA-F0-9]{64}$/,
      message: i18n.t('validations.transactionIdFormat')
    }
  },
  transactionIdETH:{
    presence: {
      message: i18n.t('validations.transactionId')
    },
    format: {
      pattern: /^(0x)[a-fA-F0-9]{64}$/,
      message: i18n.t('validations.transactionIdFormat')
    }
  },
  amount:{
    presence: {
      message: i18n.t('validations.amount')
    },
  },
  file:{
    presence: {
      message: i18n.t('validations.file')
    },
  },
  codeSms:{
    presence: {
      message: i18n.t('validations.codeSms')
    },
    length: {
      minimum: 6,
      maximum: 6,
      message: i18n.t('validations.codeSms')
    },
  },
  subject:{
    presence: {
      message: i18n.t('validations.subject')
    },
  },
  message:{
    presence: {
      message: i18n.t('validations.message')
    },
  },
  referenceCode:{
    presence: {
      message: i18n.t('validations.referenceCode')
    },
  },
  }
  return  valid
}
export default Validations;


