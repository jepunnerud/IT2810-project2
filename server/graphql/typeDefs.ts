import gql from 'graphql-tag'

const typeDefs = gql`
  type Ingredient {
    ingredient: String
    measure: String
  }

  type Drink {
    _id: ID!
    name: String
    category: String
    alcoholic: Boolean
    glass: String
    instructions: String
    picture: String
    ingredients: [Ingredient]
  }

  input DrinkInput {
    name: String
    category: String
    alcoholic: Boolean
    glass: String
    instructions: String
    picture: String
    ingredients: [IngredientInput]
  }

  type PageInfo {
    totalCount: Int
    totalPages: Int
  }

  type DrinksPage {
    drinks: [Drink]
    pageInfo: PageInfo
  }

  input IngredientInput {
    ingredient: String
    measure: String
  }

  type Query {
    drinks(ingredient: String, limit: Int, skip: Int, sort: String): DrinksPage
    drink(id: ID!): Drink
    favourites(favourites: [ID], limit: Int, skip: Int): DrinksPage
    search(
      query: String
      ingredient: String
      limit: Int
      skip: Int
      sort: String
    ): DrinksPage
  }

  type Mutation {
    addDrink(input: DrinkInput): Drink!
    updateDrink(id: ID!, input: DrinkInput): Boolean
    deleteDrink(id: ID!): Boolean
  }
`

export default typeDefs
