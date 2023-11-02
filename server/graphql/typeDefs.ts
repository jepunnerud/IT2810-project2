import { gql } from 'apollo-server-express';


const typeDefs = gql`
  type Ingredient {
    ingredient: String
    measure: String
  }

  type Drink {
    drinkid: String
    name: String
    category: String
    alcoholic: Boolean
    glass: String
    instructions: String
    picture: String
    ingredients: [Ingredient]
  }

  input DrinkInput {
    drinkid: String
    name: String
    category: String
    alcoholic: Boolean
    glass: String
    instructions: String
    picture: String
    ingredients: [IngredientInput]
  }

  input IngredientInput {
    ingredient: String
    measure: String
  }


  type Query {
    drinks: [Drink]
    drink: Drink
  }

  type Mutation {
    addDrink(input: DrinkInput): Drink!
    updateDrink(drinkid: ID!, input: DrinkInput): Drink
    deleteDrink(drinkid: ID!): Boolean
  }
`;

export default typeDefs

