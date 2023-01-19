import { ApolloClient, InMemoryCache } from "@apollo/client";
// const { ApolloCliient, InMemoryCache } = require("@apollo/client");
const apolloCliient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default apolloCliient;
