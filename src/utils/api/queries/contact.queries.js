
import { gql, useQuery } from '@apollo/client';

export const CONTACT_QUERIES = gql`
mutation($token:String!, $process:MessageParameterInputType!){
  setMessageProcess(token:$token,process: $process){
      id
      description
      status
      fBDocument
  }
}`;
