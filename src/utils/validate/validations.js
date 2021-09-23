
const Validations = {

  email: {
    presence: {
      message: 'hello'
    },

    format: {
      pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      message: 'format'
    }
  },


  password: {
    presence: {
      message:'presence'
    },
    length: {
      minimum: 8,
      maximum: 25,
      message:'lenght'
    },
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      message: 'format'
    }
  }
};

export default Validations;