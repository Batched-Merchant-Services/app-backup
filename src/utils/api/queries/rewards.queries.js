import { gql, useQuery } from '@apollo/client';

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
  }`;
export const GET_VALIDATE_REWARDS_PROCESS_BY_USER = gql`
  query($token:String!) {
    getTotalLicensesInNetworkByUser(token: $token) 
  }`;

  export const SET_RESET_PROCESS_REWARDS = gql`
  query($token:String!) {
    getResetValidateSessionToken(token: $token) 
  }`;

  export const GET_VALIDATE_REWARDS_PROCESS = gql`
  query($token:String!) {
    getValidateSessionToken(token:$token,isStart:$isStart)
  }`;

