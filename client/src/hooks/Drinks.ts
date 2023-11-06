//Fetcher drinks fra databasen/json. Ikke ferdig
import { useQuery } from '@tanstack/react-query'
import { Drink } from '../types.ts'
import { drinks } from '../assets/drinks.ts'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

function readDrinksFromJson(): Drink[] {
  return drinks
}

function useDrinks() {
  return useQuery({
    queryFn: async () => {
      const drinks = readDrinksFromJson()
      return drinks
    },
    queryKey: ['drinks'],
  })
}

function useDrink(idDrink: string) {
  return useQuery<Drink | undefined>({
    queryFn: async () => {
      const drinks = readDrinksFromJson()
      const drink = drinks.find((d: Drink) => d.drinkid === idDrink)
      return drink
    },
    queryKey: ['drink'],
  })
}


// Set up Apollo Client
const GRAPHQL_SERVER_URI = 'http://localhost:3000/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_SERVER_URI,
  cache: new InMemoryCache(),
});

// Define the GraphQL query
const GET_ALL_DRINKS_QUERY = gql`
  query GetAllDrinks {
    drinks {
      drinkid
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

// Function to load all drinks from the server
async function loadAllDrinksFromServer() {
  try {
    const { data } = await client.query({
      query: GET_ALL_DRINKS_QUERY
    });
    return data.drinks;
  } catch (error) {
    console.error("Error fetching drinks from server:", error);
    return [];
  }
}


loadAllDrinksFromServer().then(drinks => {
  console.log(drinks);
});


export { useDrinks, useDrink, loadAllDrinksFromServer }
