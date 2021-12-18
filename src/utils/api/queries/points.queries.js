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

export const CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS = gql`
mutation($token: String!,$withdrawalAddress: String!, $withdrawalPool: Int!,$depositAddress: String!,$depositPool: Int!,$amount: Float!$transactionDate: DateTime! $note: String!){
  createPoolTransactionByTokenAddress(token: $token, withdrawalAddress: $withdrawalAddress, withdrawalPool: $withdrawalPool, depositAddress: $depositAddress, depositPool: $depositPool, amount: $amount, transactionDate: $transactionDate, note: $note){
      id
  }
}`

export const CREATE_POOL_TRANSACTION_BY_TOKEN_ADDRESS_TO_CLIENT = gql`
mutation($token: String!,    $withdrawalAddress: String!,     $withdrawalPool: Int!,    $amountAddress: Float!,    $depositClient: String!,    $depositPool: Int!,    $amountClient: Float!    $transactionDate: DateTime!,    $note: String!){
  createPoolTransactionByTokenAddressToClient(token: $token,     withdrawalAddress: $withdrawalAddress,     withdrawalPool: $withdrawalPool,     amountAddress: $amountAddress,     depositClient: $depositClient,     depositPool: $depositPool,     amountClient: $amountClient,     transactionDate: $transactionDate,     note: $note){
      id
  }
}`



