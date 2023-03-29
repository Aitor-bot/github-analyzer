import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GITHUB_TOKEN = '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'; // Reemplaza esto con tu token de acceso personal

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
