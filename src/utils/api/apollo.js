import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL_STAGING, PUBLIC_KEY } from '@env';
import i18n from '@utils/i18n';
import { getUTCDateString } from "../formatters";
import { generateRSA } from "./encrypt";
import { Alert } from "react-native";


console.log('API_URL_STAGING', API_URL_STAGING, PUBLIC_KEY);


const getTicks = () => {
  const date = new Date(getUTCDateString());
  return ((new Date(date.getTime() + date.getTimezoneOffset() * 60000) * 10000) + 621355968000000000);
}

const httpLink = new HttpLink({
  //test: ``https://services-test.apps-uulala.io/UulalaAuth/graphql`,
  //uri: `http://52.13.23.229/UulalaOAuth/graphql`,
  uri: `http://52.13.23.229/UulalaOAuth/graphql`,
  headers: {
    //prod https://batched-services.apps-uulala.io/UulalaOAuth/graphql
  }
});


const activityMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'content-hash': generateRSA('AppBatched' + '|' + getTicks()),
      'Content-Type': 'application/json',
      'Accept':'application/json'
    },
  }));
  return forward(operation).map(result => {
    // console.info('request',operation?.variables)
    // console.info('response',result?.data)
    return result
  })
})



const errorLink = onError(({ forward, networkError, operation, graphQLErrors }) => {
  console.log('operation',operation,graphQLErrors,networkError?.result?.Message)
  if (networkError) {
    const trimMessage = networkError?.result?.Message?.replace('GraphQL.ExecutionError:', '').replace('|', '').trim();
    switch (trimMessage) {
      case 'bad_token':
        networkError.message = i18n.t('General.errors.textBadCredentials');
        break;
      case 'bad_credentials':
        networkError.message = i18n.t('General.errors.textBadCredentials');
        break;
      case 'user_not_active_yet':
        networkError.message = i18n.t('General.errors.textUserNotActive');
        break;
      case 'user_not_found':
        networkError.message = i18n.t('General.errors.textUserNotFound');
        break;
      default: networkError.message = networkError?.result?.Message?.replace('GraphQL.ExecutionError:', '').replace('|', '').trim();
        break;
    }
  }
  forward(operation);
});



const cache = new InMemoryCache()

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, activityMiddleware, httpLink]),
  cache: cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})
