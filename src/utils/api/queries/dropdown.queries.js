import { gql, useQuery } from '@apollo/client';

export const GET_DATA = gql`
query ($id:String!,$languaje:Int!){
  getCombo(id:$id, languaje:$languaje){
     value
     description
  }
  }`;

export const GET_COUNTRIES_QUERY = gql`
query {
  getCountries{
     countryNumber
     englishName
     iso2
     iso3
     iso4217
     currency
     phoneCode
     status
     emoji
     icon
     capital
  }
  }`;

  export const GET_GENDER_QUERY = gql`
  query ($token:String!,$id:String!,$languaje:Int!){
    getUserCombo(token:$token,id:$id, languaje:$languaje){
       value
       description
    }
  }`;

  export const GET_TYPE_IDENTIFICATION = gql`
  query ($token:String!,$id:String!,$languaje:Int!){
    getUserCombo(token:$token,id:$id, languaje:$languaje){
       value
       description
    }
  }`;

