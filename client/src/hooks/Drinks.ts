//Fetcher drinks fra databasen/json. Ikke ferdig
import { useQuery } from '@tanstack/react-query'
import { Drink } from '../types.ts'
import { drinks } from '../assets/drinks.ts'

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

export { useDrinks, useDrink }
