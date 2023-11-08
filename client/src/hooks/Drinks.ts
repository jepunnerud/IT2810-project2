//Fetcher drinks fra databasen/json. Ikke ferdig
import { Drink } from '../types.ts'
import { drinks } from '../assets/drinks.ts'
import { gql, useQuery } from '@apollo/client';
import request from 'graphql-request'


function readDrinksFromJson(): Drink[] {
  return drinks
}


function useDrinks() {
  return useQuery(GET_ALL_DRINKS_QUERY)
}

function useDrink(id: string) {
  // return useQuery<Drink | undefined>({
  //   queryFn: async () => {
  //     const drinks = loadAllDrinksFromServer()
  //     const drink = (await drinks).find((d: Drink) => d.id === id)
  //     return drink
  //   },
  //   queryKey: ['drink'],
  // })
}




// Set up Apollo Client
const GRAPHQL_SERVER_URI = 'http://localhost:8000/graphql';


// Define the GraphQL query
const GET_ALL_DRINKS_QUERY = gql`
  query GetAllDrinks {
    drinks {
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
`;


const ADD_DRINK_MUTATION = gql`
  mutation AddDrink($input: DrinkInput!) {
    addDrink(input: $input) {
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
`;



/*
async function loadAllDrinksFromServer() {
  const { data } = useQuery({
    queryKey: ['drinks'],
    queryFn: async () =>
      request(
        GRAPHQL_SERVER_URI,
        GET_ALL_DRINKS_QUERY,
        { first: 10 },
      ),
  })
  return data
}
*/

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


// loadAllDrinksFromServer().then(drinks => {
//   console.log(drinks)
// })


export { useDrinks, useDrink/*, addDrinkToServer, loadAllDrinksFromServer*/ }










/*
const newDrink = {
  name: 'Mojito',
  category: 'Cocktail',
  alcoholic: true,
  glass: 'Highball glass',
  instructions: 'Muddle mint leaves with sugar and lime juice...',
  picture: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
  ingredients: [
    { ingredient: 'White rum', measure: '2-3 oz' },
    { ingredient: 'Mint', measure: 'Leaves' },
  ]
};



addDrinkToServer(newDrink).then(addedDrink => {
  console.log(addedDrink);
}).catch(error => {
  console.error(error);
});

*/
