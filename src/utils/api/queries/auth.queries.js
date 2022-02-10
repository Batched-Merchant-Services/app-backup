import { gql, useQuery } from '@apollo/client';

export const LOGIN_QUERY = gql`
query ($user:String!,$password:String!, $id: String!, $languaje: Int!, $groupid:Int!){
  getLoggin(user: $user, password:$password, id: $id, languaje: $languaje, groupid:$groupid){
    token
    uuid
    timeOut
    locked
  }
}`;

export const LOGOUT_QUERY = gql`
  query($token:String!){
    getLogout(token:$token){
      token
      uuid
      timeOut
      locked
    }
  }`;

export const CHANGE_TYPE_AUTHENTICATION = gql`
mutation ($token:String!,$type:Int!){
  setPrimary2fa(token: $token, type:$type)     
}`
 
export const ACTIVATION_THIRD_PARTY = gql`
mutation ($token:String!,$code:String!,$isPrimary:Boolean!){
  setEnabled2faThirdParty(token: $token, code:$code,isPrimary:$isPrimary)     
}`

export const ACTIVATION_SMS = gql`
mutation ($token:String!,$code:String!,$isPrimary:Boolean!){
  setEnabled2faSms(token: $token, code:$code,isPrimary:$isPrimary)     
}`

export const ACTIVATION_EMAIL = gql`
mutation ($token:String!,$code:String!,$isPrimary:Boolean!){
  setEnabled2faEmail(token: $token, code:$code,isPrimary:$isPrimary)     
}`

export const AUTHENTICATION_TWO_FACTORS = gql`
query($token:String!) {
  getSecurityCode(token:$token)
}`
//SMS
export const AUTHENTICATION_TWO_FACTORS_SMS = gql`
query($token:String!) {
  getSecurityCodeDirect(token:$token)
}`
//EMAIL
export const AUTHENTICATION_TWO_FACTORS_EMAIL = gql`
query($token:String!) {
  getSecurityCodeDirectSES(token:$token)
}`

export const AUTHENTICATION_TWO_FACTORS_QR = gql`
query ($token:String!){
  getImageTwoFactor(token: $token)
  {
      secretCode
      qrCodeUrl
  }
}`



