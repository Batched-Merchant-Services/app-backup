import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from '@apollo/client';

const makeApolloClient = (token) => {

  const httpLink = new HttpLink({
    uri: `https://hasura.io/learn/graphql`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const cache = new InMemoryCache()


  const client = new ApolloClient({
    httpLink,
    cache
  });


  return client;

}

export default makeApolloClient;
