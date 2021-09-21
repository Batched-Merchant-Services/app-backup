import { gql, useQuery } from '@apollo/client';


export const FETCH_TODOS = gql`
 query {
   todos (
     order_by: {
       created_at: desc
     },
     where: { is_public: { _eq: false} }
   ) {
     id
     title
     is_completed
     created_at
     is_public
     user {
       name
     }
   }
 }
 `;