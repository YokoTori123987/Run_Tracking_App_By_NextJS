// const { PrismaClient } = require('@prisma/client')
// const express = require('express')
// const cors = require('cors')
// var {schema} = require('./graphql/schema')
// const { ApolloServer } = require('apollo-server-express')
// const { makeSchema, subscriptionType } = require('nexus')
// const http = require('http');

// const apollo = new ApolloServer({schema})

// const app = express()
// const httpServer = http.createServer(app)

// const prisma = new PrismaClient();

// app.use(cors())

// app.use(
//     '/graphql',
//     graphqlHTTP({
//       schema,
//       context: context,
//       graphiql: true,
// }),

// app.use(
//     '/graphql',
//   graphqlHTTP({
//     schema: MyGraphQLSchema,
//     graphiql: true,
//   }),
// )

// app.get('/', async (req, res) => {
//     // console.log(first)
//     const User = await prisma.user.findMany()
//     console.log(User)
//     res.json({msg: User})
// })

// const port = process.env.PORT || 9000
// app.listen(port);

// console.log(`\
// 🚀 Server ready at: http://localhost:${port}/graphql
// ⭐️ See sample queries: http://pris.ly/e/ts/graphql-express-sdl-first#using-the-graphql-api
// `)

// apollo.installSubscriptionHandlers(httpServer)
// apollo.applyMiddleware({ app })
// httpServer.listen( port, () => {
//   console.log(`server at http://localhost:${port}${apollo.graphqlPath}`)
//   console.log(`Subscriptions server at ws://localhost:4000${apollo.subscriptionsPath}`)
// })

const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const {express} = require('express');

async function app() {
  const PORT = 4000;
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({app})
  const httpServer = http.createServer(app);
//   server.installSubscriptionHandlers(httpServer); 

  // Make sure to call listen on httpServer, NOT on app.
  await new Promise(resolve => httpServer.listen(PORT, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  return { server, app, httpServer };
}
app()