# The project - Cocktail Connoisseur

The website can be found at [http://it2810-06.idi.ntnu.no/project2/](http://it2810-06.idi.ntnu.no/project2/).

If you want to run the site locally, first clone the project, then do `yarn` or `npm install` in the project's client folder. Then, do `yarn dev` or `npm run dev` and head to [http://localhost:5173](http://localhost5173) to find the local server.

The website shows a collection of different drinks.

The home page displays the drinks with a picture and the name. Using a dropdown bar, you can filter the drinks by different ingredients. You can also search for drinks by their name.

Clicking on a drink card will lead to an info page for this drink. Here, the user will be shown the image of the drink, along with ingredients, measurements for those ingredients, an instruction, some general information, and a button to add or remove from favorites. There is a favorite icon on each drink card on the front page as well.

Favorites are stored using local storage and can be found on the favorites page. After clicking on a drink, you can toggle between different drinks using arrow buttons.

In addition, the navbar contains a dark mode toggle button. Try it out in when you are searching for drinks at night time!

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

### Code history and comments

The code history is well-documented through meaningful commit messages. This provides a clear and understandable code history, crucial for straightforward future development of the website. Additionally, the code is self-explanatory, and where necessary, comments have been included to enhance understanding.

### Custom-built components

We have chosen not to use pre-built component libraries. This decision is based on the need to tailor components precisely to our specific requirements. Moreover, this choice significantly reduces package size, aligning with principles of sustainable development.

## Global state management

The website utilizes the React Context API (with the useContext hook) to manage global state. This allows for the sharing of state between different components. We used this to enable the user to choose between dark mode and light mode. By using useTheme() hook, components can easily access the global state, and thus be displayed either as dark or light mode.

## Backend

For the backend of our project, we have utilized the following technologies and libraries:

- **MongoDB**: We chose MongoDB as our database system to store drink data. MongoDB is a NoSQL database that provides flexibility and scalability, making it a suitable choice for managing our drink collection.

- **GraphQL**: Our backend API is powered by GraphQL, which allows clients to request only the data they need. This helps in reducing over-fetching or under-fetching of data, resulting in more efficient communication between the client and server.

- **Apollo Server**: We have implemented Apollo Server to create a GraphQL server for handling queries and mutations. Apollo Server simplifies the process of setting up a GraphQL server and integrates seamlessly with our MongoDB database.

## Frontend

For the frontend of our project, we have used the following technologies and libraries:

- **React with Vite**

- **Context API**: We use React's Context API for managing global state within our application. This allows us to share data and state between components without the need for complex prop drilling. We use this to allow for global light and dark themes.

- **Apollo Client**: To interact with our GraphQL backend, we've integrated Apollo Client into our React application. Apollo Client simplifies data fetching and caching, making it easier to work with GraphQL data in our components.

Feel free to explore the code and enjoy exploring the world of cocktails with Cocktail Connoisseur!

## New functionalities in this version

- **Adding drinks:** We made a page for adding your own drinks to the database.
- **Pagination**
- **Search, sorting and filtering in backend:** We moved these parameters from frontend to backend. They all work perfectly in combination with each other.

## Testing

### Component testing

Vitest is used for testing components. To run the test do `yarn test` or `npm run test` in the client folder.

We made tests for the components we consider the most important, being the filter dropdown and the searchbar. The tests checks that the components render and that the initial setup is correct. Since these tests test the components isolated, there is a limited amount of tests that are useful to implement. Also, the interaction between the components and the database are covered by the end-2-end test.

### End-to-end testing

Cypress is employed for end-to-end (E2E) testing, providing a robust and effective solution for testing the website's functionality. Cypress is chosen for its user-friendly API, real-time reloading, and the ability to simulate user interactions with the application.

End-to-end testing with Cypress is implemented to check the functionality of the website as a whole. The E2E test goes through a scenario that a real user might encounter; adding a new drink, filtering by ingredients, searching for a drink, and adding and removing a drink to and from favourites.

This comprehensive test coverage ensures that the website is robust and operates seamlessly under various user scenarios. By addressing both unit tests and E2E testing, the project maintains a high level of quality and reliability.

To run the test locally, first start a dev server with `yarn dev --host` in the client folder (the `--host` flag exposes the server to enable Cypress to access it), then with the server running in the background, do `npx cypress run --browser chrome` (or whichever browser you would like). This will run the e2e tests in the terminal. To run the tests with a visual, do `yarn cypress`.
