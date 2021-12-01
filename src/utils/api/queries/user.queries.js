import { gql, useQuery } from '@apollo/client';


export const SET_FILE = gql`
mutation($token:String!,$fileName:String!,$file64:String!){
  setFile(token:$token,fileName:$fileName,file64:$file64)
}`;


export const GET_USER_BATCHED = gql`
  query($token:String!,$field:String!,$id:String!){
    getUsersByField(token:$token,field:$field,id:$id)
    {
      id
      email
      phoneNumber
      lada
      is2Points
      refererId
      clients {
        id
        account {
          id
          address
          balanceTokens {
            total
            currency
          }
        }
      }
      usersProfile
      {
          userID
          id
          status
          name
          accountId
          roleId
          accounts
          {
              id
              term
              status
              firstName
              avatarImage
              lastName
              secondLastName
              phoneNumber
              middleName
              email
              clientId
              currency
              gender
              alias
              birthday
              nationalId
              otherNationalId
              countryCode
              externalId
              pin
              customerId
              isComplete
          }

      },
      licensesReferences
      {
        id
        uuid
        email
        name
        description
        estimateAmount
        level
        total
        type
        statusKraken
        status
        transactionId
        approvedAmount
        amountReferrer
        percentageReferrer
        amountSponsor
        percentageSponsor
        isPaid
        currency
        amountKraken
        licensesReferences
        {
          id
          uuid
          email
          name
          description
          estimateAmount
          level
          total
          type
          statusKraken
          status
          transactionId
          approvedAmount
          amountReferrer
          percentageReferrer
          amountSponsor
          percentageSponsor
          isPaid
          currency
          amountKraken
        } 
      } 
      bachedTransaction
      {
        id
        status
        reference
        address
        amount
        description
        referenceTrx
        verifyTrx
        fee
        feeTotal
        transactionType
        authorizeDecline
        voucherCrypto
        addressCrypto
        currencyCrypto
        createdDate
        transactionId
        routingNumber
        accountNumber
      }
    }
  }`;


export const VALIDATE_SESSION_QUERY = gql`
query($token:String!){
  getValidateSession(token:$token){
    token
    uuid
    timeOut
    locked
  }
}`;


