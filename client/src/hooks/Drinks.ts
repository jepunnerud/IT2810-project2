import { gql, useQuery } from '@apollo/client'
import { DrinkInput } from '../types'
import { apolloClient } from '../App'
import { badwords } from '../assets/badwords'


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
  const valid = checkDrinkinput(drink);
  if (valid) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: ADD_DRINK_MUTATION,
        variables: {
          input: drink
        }
      });
      return data.addDrink;
    } catch (error) {
      console.error("Error adding drink to server:", error);
      throw error;
    }
  }
  return valid

}

function checkDrinkinput(drink: DrinkInput): boolean {
  if (badwords.some((badword: string) => drink.instructions.toLowerCase().includes(badword))) {
    return false
  }
  else if (badwords.some((badword: string) => drink.name.toLowerCase().includes(badword))) {
    return false
  }
  else if (badwords.some((badword: string) => drink.picture.toLowerCase().includes(badword))) {
    return false
  }
  drink.ingredients.forEach(ing => {
    if (badwords.some((badword: string) => ing.ingredient.toLowerCase().includes(badword))) {
      return false
    }
    else if (ing.measure) {
      if (badwords.some((badword: string) => ing.ingredient.toLowerCase().includes(badword))) {
        return false
      }
    }
  });
  return true
}

export { useDrinks, useDrink, addDrinkToServer }
