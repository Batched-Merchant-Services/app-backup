import { gql, useQuery } from '@apollo/client';

export const GET_REFERRED_ID = gql`
query($id:String!)
  {        
      getUserReferer(id:$id)
      {     
          firstName
          lastName
          avatarImage
      }
  }`