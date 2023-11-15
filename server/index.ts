import mongoose from 'mongoose'
import typeDefs from './graphql/typeDefs' // Assuming this is where your GraphQL type definitions are
import resolvers from './graphql/resolvers' //
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  mongoose.set('strictQuery', true)
  mongoose
    .connect(`mongodb://it2810-06.idi.ntnu.no:27017`, {
      dbName: 'connoisseurDB',
      retryWrites: true,
      w: 'majority',
    })
    .then(() => console.log('connected'))
    .catch((e) => console.log(e))

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  })

  console.log(`🚀 Server ready at ${url}`)
}

startServer()
