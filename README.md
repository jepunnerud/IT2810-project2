# The project - Cocktail Connoisseur

The website can be found at [http://it2810-06.idi.ntnu.no/project2/](http://it2810-06.idi.ntnu.no/project2/).

If you want to run the site locally, first clone the project, then do `yarn` or `npm install` in the project's client folder. Then, can do `yarn dev` or `npm run dev` and head to [http://localhost:5173](http://localhost5173) to find the local server.

The website shows a collection of different drinks.

The home page displays the drinks with a picture and the name. Using a dropdown bar, you can filter the drinks by different ingredients. You can also search for drinks by their name.

Clicking on a drink card will lead to an info page for this drink. Here, the user will be shown the image of the drink, along with ingredients, measurements for those ingredients, an instruction, some general information, and a button to add or remove from favorites. There is a favorite icon on each drink card on the front page as well.

Favorites are stored using local storage and can be found on the favorites page. After clicking on a drink, you can toggle between different drinks using arrow buttons.

In addition, the navbar contains a dark mode toggle button. Try it out in when you are searching for drinks at night time!

## The progress

We set up some tools at the start of the project:

- Prettier to avoid merge conflicts due to formatting.
- CI pipeline to avoid merging code with build or linting errors, or that is not formatted correctly.
- Protection of the main branch to maintain integrity.

### Design

- Extensive use of flexbox to ensure responsive design.
- Use of Fuse.js library to implement fuzzy search since this would have taken too much time to implement on our own.

### Backend

For the backend of our project, we have utilized the following technologies and libraries:

- **MongoDB**: We chose MongoDB as our database system to store drink data. MongoDB is a NoSQL database that provides flexibility and scalability, making it a suitable choice for managing our drink collection.

- **GraphQL**: Our backend API is powered by GraphQL, which allows clients to request only the data they need. This helps in reducing over-fetching or under-fetching of data, resulting in more efficient communication between the client and server.

- **Apollo Server**: We have implemented Apollo Server to create a GraphQL server for handling queries and mutations. Apollo Server simplifies the process of setting up a GraphQL server and integrates seamlessly with our MongoDB database.

### Frontend

For the frontend of our project, we have used the following technologies and libraries:

- **React with Vite**

- **Context API**: We use React's Context API for managing global state within our application. This allows us to share data and state between components without the need for complex prop drilling. We use this to allow for global light and dark themes.

- **Apollo Client**: To interact with our GraphQL backend, we've integrated Apollo Client into our React application. Apollo Client simplifies data fetching and caching, making it easier to work with GraphQL data in our components.

Feel free to explore the code and enjoy exploring the world of cocktails with Cocktail Connoisseur!

## The plan

There is still som work remaining. This is what we plan on implementing for the next submission:

- **Adding drinks.** We made a page for adding your own drinks to the database, which works on both front- and backend. However, the user will not be able to try it out in this release since we don't have validation for inappropiate inputs. Before implementing this feature, we either want a good filter for inappropriate inputs, or for it to only be accessable for admin users.
- **Search, sorting and filtering in backend.** We have a working backend, but for now the searching, sorting and filtering takes place in frontend.
- **Pagination**
- **Testing**
