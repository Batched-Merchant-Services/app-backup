import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";


  const httpLink = new HttpLink({
    uri: `https://services-test.apps-uulala.io/UulalaAuth/graphql`
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const cache = new InMemoryCache()

  export const client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: cache
  })
