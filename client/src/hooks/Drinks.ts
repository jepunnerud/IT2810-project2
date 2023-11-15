import { gql, useQuery } from '@apollo/client'

function useDrinks(ing: string, skip: number) {
  return useQuery(GET_ALL_DRINKS_QUERY, {
    variables: { ing: ing, limit: 20, skip: skip },
  })
}

function useDrink(id: string) {
  return useQuery(GET_SINGLE_DRINK_QUERY, {
    variables: { id },
  })
}

// Define the GraphQL query
const GET_ALL_DRINKS_QUERY = gql`
  query GetAllDrinks($ing: String, $limit: Int, $skip: Int) {
    drinks(ing: $ing, limit: $limit, skip: $skip) {
      id
      name
      picture
      ingredients {
        ingredient
      }
    }
  }
`

const GET_SINGLE_DRINK_QUERY = gql`
  query GetSingleDrink($id: ID!) {
    drink(id: $id) {
      id
      name
      category
      alcoholic
      glass
      instructions
      picture
      ingredients {
        ingredient
        measure
      }
    }
  }
`

// const ADD_DRINK_MUTATION = gql`
//   mutation AddDrink($input: DrinkInput!) {
//     addDrink(input: $input) {
//       name
//       category
//       alcoholic
//       glass
//       instructions
//       picture
//       ingredients {
//         ingredient
//         measure
//       }
//     }
//   }
// `

// //Funker
// async function addDrinkToServer(Drink: Drink) {
//   try {
//     const { data } = await client.mutate({
//       mutation: ADD_DRINK_MUTATION,
//       variables: {
//         input: Drink
//       }
//     });
//     return data.addDrink;
//   } catch (error) {
//     console.error("Error adding drink to server:", error);
//     throw error;
//   }
// }

export { useDrinks, useDrink /*, addDrinkToServer*/ }
