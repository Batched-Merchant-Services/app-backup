import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL_STAGING,PUBLIC_KEY } from '@env';
import i18n from '@utils/i18n';


console.log('API_URL_STAGING',API_URL_STAGING,PUBLIC_KEY);

  const httpLink = new HttpLink({
    uri: `https://batched-services.apps-uulala.io/UulalaOAuth/graphql`
    //prod https://batched-services.apps-uulala.io/UulalaOAuth/graphql
  });

const errorLink = onError(({ forward, networkError, operation }) => {
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
    link: ApolloLink.from([errorLink, httpLink]),
    cache: cache
  })
