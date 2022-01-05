import { gql, useQuery } from '@apollo/client';

export const EDIT_ACCOUNT = gql`
mutation ($token:String!, $data:AccountDataInputType!)
{  
  editAccountData(token:$token,data: $data)
  {        
      id
  }
}`

export const CREATE_ADDRESS_QUERY = gql`
mutation ($token:String!, $data:AccountsAddressInputType!)
{  
  createAccountsAddress(token:$token,data: $data)
  {
      accountId
      id
  }
}`

export const EDIT_ADDRESS_QUERY = gql`
mutation ($token:String!, $data:AccountsAddressEditInputType!)
{  
  editAccountsAddress(token:$token,data: $data)
  {
      accountId
      id
  }
}`

export const EDIT_KYC_QUERY = gql`
mutation ($token:String!, $data:AccountsKycEditInputType!)
{	  
  editAccountsKyc(token:$token,data: $data)
  {
      accountId
      id
  }
}`

export const CREATE_KYC_QUERY = gql`
mutation ($token:String!, $data:AccountsKycInputType!)
{  
  createAccountsKyc(token:$token,data: $data)
  {
      accountId
      id
  }
}`


export const CREATE_BANK_INFO_QUERY = gql`
mutation ($token:String!, $data:AccountsBankInformationInputType!)
{  
  createAccountsBankInformation(token:$token,data: $data)
  {
      accountId
      id
  }
}`

export const EDIT_BANK_INFO_QUERY = gql`
mutation ($token:String!, $data:AccountsBankInformationEditInputType!)
{  
  editAccountsBankInformation(token:$token,data: $data)
  {
      accountId
      id
  }
}`








