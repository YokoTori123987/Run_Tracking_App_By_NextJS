// import { ApolloServer } from "apollo-server-micro";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "graphql/schema";
import { createContext } from "../../../graphql/context";

const apollo = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apollo.start();

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apollo.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
