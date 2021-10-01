import i18n from '@utils/i18n';
const Validations = {

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
  agree:{
    presence: {
      message: i18n.t('validations.agree')
    },
  },
  secretAnswers:{
    presence: {
      message: i18n.t('validations.agree')
    },
  },
  secretAnswerConfirm:{
    presence: {
      message: i18n.t('validations.agree')
    },
  },
  referenceCode:{
    presence: {
      message: i18n.t('validations.agree')
    },
  }
};

export default Validations;