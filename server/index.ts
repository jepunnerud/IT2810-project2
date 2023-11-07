import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import typeDefs from './graphql/typeDefs' // Assuming this is where your GraphQL type definitions are
import resolvers from './graphql/resolvers' //
import { ApolloServer } from 'apollo-server-express'
import 'dotenv/config'

async function startServer() {
  const PORT = process.env.PORT || 3000
  //const PORT = 8000

  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()
  server.applyMiddleware({ app: app, path: '/graphql' })

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      )
    }
    next()
  })

  mongoose.set('strictQuery', true)
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cocktailconnoisseur.u1rupiz.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: 'connoisseurDB',
        retryWrites: true,
        w: 'majority',
      }
    )
    .then(() => console.log('connected'))
    .catch((e) => console.log(e))

  app.listen(PORT, () => {
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`)
  })
}

startServer()
