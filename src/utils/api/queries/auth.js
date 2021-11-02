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