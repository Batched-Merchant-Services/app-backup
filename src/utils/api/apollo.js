import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL_STAGING,PUBLIC_KEY } from '@env';
import i18n from '@utils/i18n';
import { getUTCDateString } from "../formatters";
import { generateRSA } from "./encrypt";

console.log('API_URL_STAGING',API_URL_STAGING,PUBLIC_KEY);

  const httpLink = new HttpLink({
    //uri: `https://batched-services.apps-uulala.io/UulalaOAuth/graphql`,
    uri: `https://services-test.apps-uulala.io/UulalaAuth/graphql`,
    headers: {
    //prod https://batched-services.apps-uulala.io/UulalaOAuth/graphql
    }
  });

  const activityMiddleware = new ApolloLink((operation, forward) => {
    //console.log('operation',operation?.query?.definitions[0]?.selectionSet?.selections[0]?.name, 'variables',operation?.variables);
    const utc = getUTCDateString();
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'content-hash': generateRSA('AppMobile'+'|'+ utc)
      }
    }));
    return forward(operation);
  
  })



const errorLink = onError(({ forward, networkError, operation,graphQLErrors }) => {
  console.log('graphQLErrors',graphQLErrors,networkError?.result);
  if (networkError) {
    const trimMessage = networkError?.result?.Message?.replace('GraphQL.ExecutionError:', '').replace('|','').trim();
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
      default: networkError.message = networkError?.result?.Message?.replace('GraphQL.ExecutionError:', '').replace('|','').trim();
        break;
    }
  }
   forward(operation);
});


  const cache = new InMemoryCache()

  export const client = new ApolloClient({
    link: ApolloLink.from([errorLink,activityMiddleware, httpLink]),
    cache: cache
  })
