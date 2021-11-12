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


export const GET_LICENSES_QUERY = gql`
query ($token:String!,$filter:String!)
	{  
    getTypeLicenses(token:$token,filter:$filter)
    {
      id
      description
      cost
      start
      end
      uulala
      referrer
      sponsor
      trans
      committee        
    }
	}`


export const GET_CURRENT_TYPE_LICENSES = gql`
query ($token:String!)
  {  
    getCurrentTypeLicenses(token:$token)
    {
        id
        description
        cost
        start
        end        
    }
  }`

export const GET_TOTAL_LICENSES_QUERY = gql`
query ($token:String!)
	{  
    getTotalTypeLicenses(token:$token)
    {
        value
        description        	        
    }
}`


export const GET_CRYPTO_CURRENCY_QUERY = gql`
query ($token:String!,$filter:String!)
	{  
		getCryptoCurrency(token:$token,filter:$filter)
		{
				id
				currency
				name
				icon
				status			        
		}
}`

export const GET_CREATE_LICENSES_CRYPTO = gql`
mutation($token:String!,$total:Int!,$address:String!,$currency:String!,$type:Int!,$voucherCrypto:String!, $transactionId:String!){
  createLicensesCryptoTransactionDeposit(token:$token,total:$total,address:$address,type:$type,currency:$currency,voucherCrypto:$voucherCrypto, transactionId:$transactionId){
      id
      referenceTrx
  }
}`

export const UPDATE_TRANSACTION_ID_LICENSES_CRYPTO_TRANSACTION_DEPOSIT = gql`
mutation($token:String!,$id:Int!,$voucherCrypto:String!,$transactionId:String!){
  updateTransactionIdLicensesCryptoTransactionDeposit(token:$token,id:$id, voucherCrypto:$voucherCrypto,transactionId:$transactionId) {
    id
  }
}`

export const GET_CONFIG_REWARDS_TOKEN = gql`
query($token:String!) {
  getLastTimeRewards(token: $token) {
    id
    groupid
    description
    startDate
    endDate
    amount
    isClose
  }
}`

export const GET_VALIDATE_REWARDS_PROCESS = gql`
query($token:String!,$isStart:Boolean!){
  getValidateSessionToken(token:$token,isStart:$isStart)
}`


export const GET_VALIDATE_REWARDS_PROCESS_BY_USER = gql`
query($token:String!) {
  getTotalLicensesInNetworkByUser(token: $token) 
}`

export const SET_RESET_PROCESS_REWARDS = gql`
query($token:String!) {
  getResetValidateSessionToken(token: $token) 
}`

export const GET_TOTAL_LICENSES_IN_NETWORK = gql`
query($token:String!) {
  getTotalLicensesInNetwork(token: $token)  
}`
