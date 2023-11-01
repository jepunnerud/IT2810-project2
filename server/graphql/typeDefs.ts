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

  type Query {
    drinks: [Drink]
    drink: Drink
  }

  type Mutation {
    addDrink(name: String!): Drink
  }
`;

export default typeDefs

