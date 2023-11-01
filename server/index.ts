import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs"; // Assuming this is where your GraphQL type definitions are
import resolvers from "./graphql/resolvers"; // 
import { ApolloServer } from "apollo-server-express";

//La til alternativ port
/*
const port = process.env.PORT || 4000

const app = express()


mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/cocktail-connoisseur-api", {
    dbName: "connoisseurDB",
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

// app.use(helmet());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers,",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  }

  next();
});



//Nytt, skal koble til graphqltil server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

/** Setup server routes 

*/
/*
server.start().then(() => {
  //Billug snarvei
  server.applyMiddleware({ app: app as any, path: "/graphql" });

  // Apply other routes
  app.use(router);

  // Start Express server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
  });
});
*/





/*
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

*/



async function startServer() {

  const PORT = process.env.PORT || 3000;
  //const PORT = 8000

  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()
  server.applyMiddleware({ app: app, path: "/graphql" });

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    }
    next();
  });

  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb://127.0.0.1:27017/cocktail-connoisseur-api", {
      dbName: "connoisseurDB",
      retryWrites: true,
      w: "majority",
    })
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));


  app.listen(PORT, () => {
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
  });

}

startServer();

