import { gql, useQuery } from '@apollo/client';


export const SET_FORGOT_PASSWORD = gql`
mutation($company:Int!, $email:String!,$phone:String!,$type:Int! ){
  setRecoveryPwd(company:$company,email:$email,phone:$phone, type:$type)
}`;


export const SET_CONFIRM_PASSWORD = gql`
mutation($token:String!,$code:String!,$password:String!,$confirmPassword:String!){
  setResetPwd(token:$token,code:$code,password:$password,confirmPassword:$confirmPassword)
}`;
