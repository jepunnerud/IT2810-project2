import { gql, useQuery } from '@apollo/client'
import { DrinkInput } from '../types'
import { badwords } from '../assets/badwords'
import { ApolloClient, NormalizedCacheObject, InMemoryCache } from '@apollo/client'

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3000/',
})

function useDrinks(ingredient: string, limit: number, skip: number, sort: string) {
  return useQuery(GET_ALL_DRINKS_QUERY, {
    variables: { ingredient: ingredient, limit: limit, skip: skip, sort: sort },
  })
}

function useDrink(id: string) {
  return useQuery(GET_SINGLE_DRINK_QUERY, {
    variables: { id },
  })
}

function useFavourites(favourites: string[], limit: number, skip: number) {
  return useQuery(GET_FAVOURITES_QUERY, {
    variables: { favourites: favourites, limit: limit, skip: skip },
  })
}

function useSearchResults(
  query: string,
  ingredient: string,
  limit: number,
  skip: number,
  sort: string
) {
  return useQuery(GET_SEARCH_RESULT_QUERY, {
    variables: { query: query, ingredient: ingredient, limit: limit, skip: skip, sort: sort },
  })
}

// Define the GraphQL query
const GET_ALL_DRINKS_QUERY = gql`
  query GetAllDrinks($ingredient: String, $limit: Int, $skip: Int, $sort: String) {
    drinks(ingredient: $ingredient, limit: $limit, skip: $skip, sort: $sort) {
      _id
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
      _id
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

const GET_FAVOURITES_QUERY = gql`
  query GetFavourites($favourites: [ID], $limit: Int, $skip: Int) {
    favourites(favourites: $favourites, limit: $limit, skip: $skip) {
      _id
      name
      picture
    }
  }
`

const GET_SEARCH_RESULT_QUERY = gql`
  query GetSearchResults(
    $query: String
    $ingredient: String
    $limit: Int
    $skip: Int
    $sort: String
  ) {
    search(query: $query, ingredient: $ingredient, limit: $limit, skip: $skip, sort: $sort) {
      _id
      name
      picture
      ingredients {
        ingredient
      }
    }
  }
`

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
`

async function addDrinkToServer(drink: DrinkInput): Promise<boolean> {
  const valid = checkDrinkinput(drink)
  if (valid) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: ADD_DRINK_MUTATION,
        variables: {
          input: drink,
        },
      })
      return data.addDrink
    } catch (error) {
      console.error('Error adding drink to server:', error)
      throw error
    }
  }
  return valid
}

function checkDrinkinput(drink: DrinkInput): boolean {
  if (badwords.some((badword: string) => drink.instructions.toLowerCase().includes(badword))) {
    return false
  } else if (badwords.some((badword: string) => drink.name.toLowerCase().includes(badword))) {
    return false
  } else if (badwords.some((badword: string) => drink.picture.toLowerCase().includes(badword))) {
    return false
  }
  drink.ingredients.forEach((ing) => {
    if (badwords.some((badword: string) => ing.ingredient.toLowerCase().includes(badword))) {
      return false
    } else if (ing.measure) {
      if (badwords.some((badword: string) => ing.ingredient.toLowerCase().includes(badword))) {
        return false
      }
    }
  })
  return true
}

export { useDrinks, useDrink, addDrinkToServer, apolloClient, useFavourites, useSearchResults }
