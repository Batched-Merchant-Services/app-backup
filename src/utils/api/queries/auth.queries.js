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


export const AUTHENTICATION_TWO_FACTORS = gql`
query($token:String!) {
  getSecurityCodeDirect(token:$token)
}`

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



