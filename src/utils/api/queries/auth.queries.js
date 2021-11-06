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

export const LOGOUT = gql`
  query($token:String!){
    getLogout(token:$token){
      token
      uuid
      timeOut
      locked
    }
  }`;
