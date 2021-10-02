import i18n from '@utils/i18n';
const Validations = {
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
  

};

export default Validations;