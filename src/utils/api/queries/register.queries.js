import { gql, useQuery } from '@apollo/client';

export const COMPANY_REFERENCE = gql`
  query ($reference:String!){
    getCompanyByReference(reference:$reference){
        id
        pathLogo
        name
    }
  }`;


export const SET_REGISTER = gql`
  mutation($register:RegisterAppInputType!){
  setRegisterApp(register:$register)
  {
      email,
      phoneNumber,
      lada,
      groupId
  }
}`;

export const VALIDATE_CODE_SMS = gql`
mutation($token:String!){
  setValidateCode(token:$token)
  {
    email,
    phoneNumber,
    lada,
    groupId
  }
}`;

export const SET_REGISTER_COMPLETE = gql`
mutation($token:String!,$data:RegisterCompleteInputType!, $terms:String!, $reference:String!, $notSendActiveAccount:Boolean!){
  setRegisterComplete(token:$token,data:$data, terms:$terms, reference:$reference, notSendActiveAccount:$notSendActiveAccount)
  {
    email,
    phoneNumber,
    lada,
    groupId
  }
}`;

export const SET_PASSWORD_QUERY = gql`
mutation($token:String!,$pin:String!$password:String!){
  setRegisterPwd(token:$token,pin:$pin,password:$password)
  {
    email,
    phoneNumber,
    lada,
    groupId
  }
}`;


