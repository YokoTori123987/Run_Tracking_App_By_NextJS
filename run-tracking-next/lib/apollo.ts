import { ApolloClient, InMemoryCache } from "@apollo/client";
// const { ApolloCliient, InMemoryCache } = require("@apollo/client");
const apolloCliient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
});

export default apolloCliient;
