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
      isTwoFactor
			is2faThirdParty
			is2faSms
			is2faEmail
			type2fa
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
        companies {
          id 
          pathLogo 
          name 
          feePhysicalCard
        }
        accountCrypto 
            {
                id
                clientId
                groupId
                currency
                address
                isEnabled
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
              address
                {
                  id
                  city
                  suburb
                  country
                  state
                  street
                  number
                  typeAddress
                  zipCode
                  shortName
                  isComplete
                }
                kyc{
                  id
                  typeIdentification
                  frontId
                  backId
                  kycid
                  faceId
                  documentId
                  status
                  isComplete
                }
                bankInformation
                {
                  id
                  bankName
                  routingNumber
                  accountNumber
                  beneficiary
                  phoneNumber
                  swiftCode
                  streetAddress
                  city
                  postalCode
                  state
                  countryCode
                }
          }

      },
      licensesReferences
      {
        id
        uuid
        email
        name
        description
        level
        total
        status
        transactionId
        amountReferrer
        percentageReferrer
        currency
        referenceDate
        avatarImage
        licensesReferences
        {
          id
          uuid
          email
          name
          description
          level
          total
          status
          transactionId
          amountReferrer
          percentageReferrer
          currency
          referenceDate
          avatarImage
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


