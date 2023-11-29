# The project - Cocktail Connoisseur

For our final project, we've crafted a website centered around discovering and sharing drink recipes. Explore, experiment, and add your own twist – let's shake up the world of drinks together!

The website can be found at [http://it2810-06.idi.ntnu.no/project2/](http://it2810-06.idi.ntnu.no/project2/).

If you want to run the site locally, first clone the project, then do `yarn` or `npm install` in the project's client folder. Then, do `yarn dev` or `npm run dev` and head to [http://localhost:5173](http://localhost:5173) to find the local server. By default, this local server uses the backend hosted on `mongodb://it2810-06.idi.ntnu.no:27017`. If you want to run a local backend, see how in the [backend documentation](#backend).

The website shows a collection of different drinks.

The home page displays the drinks with a picture and the name. Using a dropdown bar, you can filter the drinks by different ingredients. The drinks can be sorted alphabetically or by difficulty. You can also search for drinks by their name, an ingredient or an instruction (e.g. "shake well").

Clicking on a drink card will lead to an info page for this drink. Here, the user will be shown the image of the drink, along with ingredients, measurements for those ingredients, an instruction, some general information, and a button to add or remove from favorites. There is a favorite icon on each drink card on the front page as well.

Favorites are stored using localStorage and can be found on the favorites page. After clicking on a drink, you can toggle between different drinks using arrow buttons.

In addition, the navbar contains a dark mode toggle button. Try it out in when you are searching for drinks at nighttime!

Feel free to explore the code and enjoy exploring the world of cocktails with Cocktail Connoisseur!

## Overview

1.  [The progress](#the-progress)
2.  [Universal design](#universal-design)
3.  [Sustainable development](#sustainable-development)
4.  [Global state management](#global-state-management)
5.  [Backend](#backend)
6.  [Frontend](#frontend)
7.  [Progress](#progress)
8.  [Testing](#testing)

## The progress

We set up some tools at the start of the project:

- Prettier to avoid merge conflicts due to formatting.
- CI pipeline to avoid merging code with build or linting errors, or that is not formatted correctly. We also later included component and end-to-end tests in the pipeline to ensure only working code is merged.
- Protection of the main branch to maintain integrity.

## Universal design

The website is designed with universal design in mind, allowing it to be used by individuals who rely on keyboard navigation. The entire site can be navigated using the keyboard, and all interactive elements are tabbable. This enables easy access for users who may not have the capability to use a touchpad or mouse.

## Sustainable development

### Reduced dependencies

To improve performance and reduce package size, unnecessary dependencies have been removed from the project. This helps minimize loading times for users and makes the website more sustainable.

### Reduced fetching from server

We've optimized server load through pagination, fetching data only when a user navigates to the next page. On the start page, we limit data retrieval to just the drink's picture and name, further minimizing server strain. Detailed information about each drink, including all fields of the drink object, is loaded only when a user clicks on a drink card.

### Reduced energy usage

By having the user being able to turn on dark mode, less electricity is used. Thus, the website is sustainable for the environment and pleasant on the eyes!

### Code history and comments

The code history is well-documented through meaningful commit messages. This provides a clear and understandable code history, crucial for straightforward future development of the website. Additionally, the code is self-explanatory, and where necessary, comments have been included to enhance understanding.

### Custom-built components

We have chosen not to use pre-built component libraries. This decision is based on the need to tailor components precisely to our specific requirements. Moreover, this choice significantly reduces package size, aligning with principles of sustainable development.

## Global state management

The website utilizes the React Context API (with the useContext hook) to manage global state. This allows for the sharing of state between different components. We used this to enable the user to choose between dark mode and light mode. By using useTheme() hook, components can easily access the global state, and thus be displayed either as dark or light mode.

## Backend

This is the server that handles requests from the Cocktail Connoisseur frontend. The backend is responsible for handling pagination, filtering, sorting and searching.

### How to run for development

Before starting your development server, ensure that the URL of the Mongoose connection is set to `mongodb://it2810-06.idi.ntnu.no:27017`. This is the URL of the MongoDB database. This is changed in the `index.ts` file. Then you can install the dependencies as usual, and start the server.

```bash
yarn
yarn build:server
yarn dev:server
```

Also ensure that the URI of the Apollo client is set to `http://localhost:3000` when using the API in development mode. One also needs to rebuild the server before the new changes work. This is especially important when changing the resolvers in `resolvers.ts`.

### Technologies

#### MongoDB

MongoDB is a NoSQL document database. This means that database records are stored as a JSON-like format. We do not have much related data in our drink collection, so MongoDB works perfectly for our project. MongoDB is a popular database used in development, and we wanted to learn how to implement it. The MongoDB Compass was also a nice feature for managing the elements in the database. In the early stages of the project we found good documentation on how to set up MongoDB, which strongly urged us to implement a MongoDB database in our project.

#### Mongoose

Mongoose is a third party Object Datamodeling library for MongoDB. This makes it easier to work with MongoDB with Node.js. Mongoose was especially helpful in the development of the resolvers when filtering, sorting and paginating. The filtering was done using the `$match` operator during aggregation. The sorting was done using the `$sort` operator. Pagination was implemented easily using a combination of `$skip` and `$limit`. The text search on the other hand was not as simple. First we had to create a text index on the fields that we wanted to query. Then we used the `$text` operator in combination with `$search`. This, however, does not grant a perfect search because the `$search` operator only matches whole words, but it came close enough to what we needed for our project.

#### GraphQL

Our backend API is powered by GraphQL, which allows clients to request only the data they need. This helps in reducing over-fetching or under-fetching of data, resulting in more efficient communication between the client and server.

#### Apollo Server

Apollo Server is an open source GraphQL server. Apollo is available top make a server out of any database type, therefore it was an easy choice to apply this on top of our MongoDB collection and one of the main reasons why we chose it for our project. It also plays well into the frontend which uses Apollo Client. Apollo Server has a good sandbox interface for testing out queries and mutations for GraphQL. This made the process of devolving the right resolvers much easier.

## Frontend

For the frontend of our project, we have used the following technologies and libraries:

- **React with Vite**

- **Context API**: We use React's Context API for managing global state within our application. This allows us to share data and state between components without the need for complex prop drilling. We use this to allow for global light and dark themes.

- **Apollo Client**: To interact with our GraphQL backend, we've integrated Apollo Client into our React application. Apollo Client simplifies data fetching and caching, making it easier to work with GraphQL data in our components.

### Responsive design

We have put a lot of focus into making the website responsive. This is to make sure it works just as well on mobile devices as it does on laptop and desktop.

To achieve good responsive design, we have used a lot of flexboxes, as well as css media queries to conditionally add css properties based on the screen size. Media queries are used to, for example, reduce the width of drink cards when the screen size is adequately small. Also, we increase the size of the favourite buttons to make them easier to click for users on mobile devices.

In addition, we used a couple window screen size listeners to conditionally render components. For example the "Go to page 1" and "Go to page 33" buttons.

## Progress

### Changes done before first delivery

- Add simple graphical user interface to show drinks on the home page.
- Drinks stored in a file on the client side.

### Changes done before second delivery

- Functional database for storing drinks.
- Filter and Search is only implemented on the client side.
- Incremental changes to the graphical user interface.

### Changes done before third delivery

- **Adding drinks:** We made a page for adding your own drinks to the database with appropriate validation of user input.
- **Pagination**
- **Search, sorting and filtering in backend:** We moved these parameters from frontend to backend. They all work perfectly in combination with each other.

### Changes done before final delivery

- Add buttons to skip to the first and last page.
- Add information about pagination in the response to queries that fetch multiple records from the database.
- Further validation of user inputs in the AddDrink feature.
- Additional end-to-end test.

## Testing

### Component testing

Vitest is used for testing components. To run the test do `yarn test` or `npm run test` in the client folder.

We made tests for the components we consider the most important, being the filter dropdown, drinkCard and the searchbar. The tests checks that the components render and that the initial setup is correct. Since these tests test the components isolated, there is a limited amount of tests that are useful to implement. Also, the interaction between the components and the database are covered by the end-2-end test. Even though these component tests are quite basic, almost every aspect of the application is tested in the end-2-end test, so our application thoroughly tested.

### Snapshot test

Snapshot testing is integral to our project for maintaining the consistency and reliability of our software. It captures a "snapshot" of the application’s UI or state, which is then used as a benchmark to detect unintended changes after code updates.

Our choice to implement snapshot testing was influenced by:

- Complex UI Components: Ensures intricate UI elements remain consistent across updates.
- Collaborative Development: Provides a safety net in team settings, maintaining code quality and consistency.
- Complements Existing Tests: Fills the gaps in visual testing not covered by unit and end-to-end testing.

### End-to-end testing

Cypress is employed for end-to-end (E2E) testing, providing a robust and effective solution for testing the website's functionality. Cypress is chosen for its user-friendly API, real-time reloading, and the ability to simulate user interactions with the application.

End-to-end testing with Cypress is implemented to check the functionality of the website as a whole. The E2E test goes through a scenario that a real user might encounter; adding a new drink, filtering by ingredients, searching for a drink, and adding and removing a drink to and from favourites. We also check the sorting in a separate end-2-end test

This comprehensive test coverage ensures that the website is robust and operates seamlessly under various user scenarios. By addressing both unit tests and E2E testing, the project maintains a high level of quality and reliability.

To run the tests locally, first start a dev server with `yarn dev --host` or `npm run dev -- --host` in the client folder (the `--host` flag exposes the server to enable Cypress to access it), then with the server running in the background, do `npx cypress run --browser chrome` (or whichever browser you would like). This will run the e2e tests in the terminal. To run the tests with a visual, do `yarn cypress` or `npm run cypress`.
