interface Drink {
  name: string
  drinkid: string
  category: string
  picture: string
  instructions: string
  alcoholic: boolean
  ingredients: Ingredient[]
  glass: string
}

interface Ingredient {
  ingredient: string
  measure?: string
}



interface DrinkInput {
  name: string
  category: string
  picture: string
  instructions: string
  alcoholic: boolean
  ingredients: Ingredient[]
  glass: string
}

export type { Drink, Ingredient, DrinkInput }

