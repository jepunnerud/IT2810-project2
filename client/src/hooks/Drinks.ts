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

const ADD_DRINK_MUTATION = gql`
  mutation AddDrink($input: DrinkInput!) {
    addDrink(input: $input) {
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


async function addDrinkToServer(Drink: Drink) {
  try {
    const { data } = await client.mutate({
      mutation: ADD_DRINK_MUTATION,
      variables: {
        input: Drink
      }
    });
    return data.addDrink;
  } catch (error) {
    console.error("Error adding drink to server:", error);
    throw error; // or return null, depending on how you want to handle errors
  }
}


/*
const newDrink = {
  drinkid: '123',
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


export { useDrinks, useDrink, loadAllDrinksFromServer, addDrinkToServer }
