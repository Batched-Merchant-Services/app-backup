import { gql, useQuery } from '@apollo/client';

export const APP_RESOURCES = gql`
query ($id:Int!){
  getBrandCompany(id:$id) {
      id
      name
      brandeo
      urlLegalDocument1
      urlLegalDocument2
      termsAndConditions
      privacyPolice
  }
}`
