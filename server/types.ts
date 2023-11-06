interface DrinkType {
  name: string
  drinkid: string
  category: string
  picture: string
  instructions: string
  alcoholic: boolean
  ingredients: IngredientType[]
  glass: string
}

interface IngredientType {
  ingredient: string
  measure?: string
}

interface IngredientInput {
  ingredient: string
  measure?: string
}


interface DrinkInput {
  drinkid: string
  name: string
  category: string
  picture: string
  instructions: string
  alcoholic: boolean
  ingredients: IngredientType[]
  glass: string
}

export type { DrinkType, IngredientType, DrinkInput, IngredientInput }

