# The project - Cocktail Connoisseur

After cloning the project, do `yarn` or `npm install` in the project's root folder.

To start the local server, do `yarn dev` or `npm run dev`.

The website shows a collection of different drinks.

The home page displays the drinks with a picture and the name. Using a dropdown bar, you can filter the drinks by different ingredients. <br />
Clicking on a drink card will lead to an info page for this drink. Here, the user will be shown the image of the drink, along with ingredients, measurements for those ingredients, an instruction, some general information, and a button to add or remove from favourites. Favourites are stored using local storage, and can be found on the favourites page. After clicking on a drink, you can toogle between differnt drinks using to arrow-buttons.

## The progress

We set up some tools at the start of the project:

- Prettier to avoid merge conflicts due to formatting.
- CI pipeline to avoid merging code with build or linting errors, or that is not formatted correctly.
- Protection of the main branch to maintain integrity.

### Design

- Extensive use of flexbox to ensure responsive design
- Use of Fuse.js library to implement fuzzy search since this would have taken too much time to implement on our own
