import { gql, useQuery } from '@apollo/client';

export const GET_POOL_BALANCE = gql`
query($token:String!,$id:Int!, $pool: Int!) {
  getBalanceTokens(token:$token,id:$id,pool:$pool){
      account
      deposit
      withdrawal
      total
  }
}`

export const GET_TRANSACTIONS_TOKENS = gql`
query($token:String!, $id:Int!, $pool: Int!,$pageNumber:Int!,$rowsOfPage:Int!) {
  getAccountTransactionsTokens(token:$token,id:$id,pool:$pool,pageNumber:$pageNumber,rowsOfPage:$rowsOfPage){
      id
      accountId
      transactionDate
      type
      amount
      finalBalance
      currencyCode
      exchageRate
      createdDate
      note {
          clientId
          accountId
          transactionId
          noteDescription
      }
  }
  
}`

