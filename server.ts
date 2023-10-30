import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { gql } from 'apollo-server';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';


async function startServer() {
    const app = express()
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    await server.start()
    server.applyMiddleware({ app: app, path: "/graphql" });

    app.use((req, res) => {
        res.send("Hello from Apollo")
    })


    const PORT = process.env.PORT || 4000;

    mongoose.set("strictQuery", true);
    mongoose
        .connect("mongodb://127.0.0.1:27017/web", {
            dbName: "drinkDB",
            retryWrites: true,
            w: "majority",
        })
        .then(() => {
            console.log("connected");
        })
        .catch((e) => console.log(e));


    console.log("Connected to Mongoose")
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();