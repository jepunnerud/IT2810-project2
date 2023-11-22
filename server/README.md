# Cocktail Connoisseur - Backend

This is the server that handles requests from the Cocktail Connoisseur frontend. The backend is responsible for handling pagination, filtering, sorting and searching.

## How to run for development

Before starting your development server, ensure that the URL of the Mongoose connection is set to `mongodb://it2810-06.idi.ntnu.no:27017`. This is the URL of the MongoDB database. This is changed in the `index.ts` file. Then you can install the dependencies as usual, and start the server.

```bash
yarn
yarn dev:server
```

## Technologies

### MongoDB

MongoDB is a NoSQL document database. This means that database records are stored as a JSON-like format. We do not have much related data in our drink collection, so MongoDB works perfectly for our project.

### Mongoose

Mongoose is a third party Object Datamodeling library for MongoDB. This makes it easier to work with MongoDB with Node.js. Mongoose was especially helpful in the development of the resolvers when filtering, sorting and paginating. The filtering was done using the `$match` operator during aggregation. The sorting was done using the `$sort` operator. Pagingation was implemented easily using a combination of `$skip` and `$limit`. The text search on the other hand was not as simple. First we had to create a text index on the fields that we wanted to query. Then we used the `$text` operator in combination with `$search`. This, however, does not grant a perfect search because the `$search` operator only matches whole words, but it came close enough to what we needed for our project.

### GraphQL

Our backend API is powered by GraphQL, which allows clients to request only the data they need. This helps in reducing over-fetching or under-fetching of data, resulting in more efficient communication between the client and server.

### Apollo Server

Apollo Server is an open source GraphQL server. Apollo is available top make a server out of any database type, therefore it was an easy choice to apply this on top of our MongoDB collection. It also plays well into the frontend which uses Apollo Client.
