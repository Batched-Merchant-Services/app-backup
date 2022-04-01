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
mutation($code:String!,$token:String!,$total:Int!,$address:String!,$currency:String!,$type:Int!,$voucherCrypto:String!, $transactionId:String!, $isDisabled:Boolean!){
  createLicensesCryptoTransactionDeposit(code:$code,token:$token,total:$total,address:$address,type:$type,currency:$currency,voucherCrypto:$voucherCrypto, transactionId:$transactionId, isDisabled:$isDisabled){
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


export const GET_TOTAL_LICENSES_IN_NETWORK_QUERY = gql`
query($token:String!) {
  getTotalLicensesInNetwork(token: $token)  
}`

export const GET_TOTAL_LICENSES_FOR_USER_QUERY = gql`
query($token:String!) {
  getTotalLicensesInNetworkByUser(token: $token) 
}`


export const GET_ADDRESS_CURRENCY = gql`
query ($token:String!,$currencyId:Int!)
{  
    getCryptoCurrencyAddress(token:$token,currencyId:$currencyId)
    {
        id
        address
        description
        status
        
    }
}`

export const GET_PRICE_CRYPTO_QUERY = gql`
query($token:String!,$symbol:String!) {
  getTickers(token:$token,symbol:$symbol)
  {
      symbol
      open
      high
      {
          valueToday
          value24H
      }
       low
      {
          valueToday
          value24H
      }
       trades
      {
          valueToday
          value24H
      }
       volumeWeightedAveragePrice
      {
          valueToday
          value24H
      }
       volume
      {
          valueToday
          value24H
      }
      lastTrade
      {
         price
         quantity
      }
     bestAsks
      {
          price
          lotQuantity
          quantity
      }
      bestBids
      {
          price
          lotQuantity
          quantity
      }
  }
}`

export const GET_TYPE_CURRENCY_CRYPTO = gql`
query ($token:String!,$parameter:String!){
  getBankParameter(token:$token,parameter:$parameter)
}`

export const GENERATE_ADDRESS_CRYPTO_QUERY = gql`
mutation($token:String!,$currency:String!){
  createExternalAddress(token:$token,currency:$currency)
  {
      id
      clientId
      groupId
      currency
      address
      isEnabled
  }
}`


export const GET_FEE_FIAT_QUERY = gql`
query($token:String!, $id:Int!) {
  getTotalFee(token:$token,id:$id)
  
}`



