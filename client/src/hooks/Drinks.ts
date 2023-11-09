import { gql, useQuery } from '@apollo/client'

function useDrinks(ing: string) {
  return useQuery(GET_ALL_DRINKS_QUERY, {
    variables: { ing },
  })
}

function useDrink(id: string) {
  return useQuery(GET_SINGLE_DRINK_QUERY, {
    variables: { id },
  })
}

// Define the GraphQL query
const GET_ALL_DRINKS_QUERY = gql`
  query GetAllDrinks($ing: String) {
    drinks(ing: $ing) {
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

// async function loadAllDrinksFromServer() {
//   try {
//     const { data } = await client.query({
//       query: GET_ALL_DRINKS_QUERY
//     });
//     return data.drinks as Drink[];
//   } catch (error) {
//     console.error("Error fetching drinks from server:", error);
//     return [];
//   }
// }

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

export { useDrinks, useDrink /*, addDrinkToServer, loadAllDrinksFromServer*/ }
