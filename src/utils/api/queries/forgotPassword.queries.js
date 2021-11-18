import { gql, useQuery } from '@apollo/client';


export const SET_FORGOT_PASSWORD = gql`
mutation($email:String!,$phone:String!,$type:Int!){
  setRecoveryPwd(email:$email,phone:$phone, type:$type)
}`;


export const SET_CONFIRM_PASSWORD = gql`
mutation($token:String!,$password:String!,$confirmPassword:String!){
  setResetPwd(token:$token,password:$password,confirmPassword:$confirmPassword)
}`;
