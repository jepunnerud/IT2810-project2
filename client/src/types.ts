interface Drink {
  name: string
  _id: string
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

interface SortingMap {
  [key: string]: (a: Drink, b: Drink) => number
}

interface NavBarItem {
  text: string
  icon?: string
  path: string
}

interface IconData {
  [key: string]: string
}

export type { Drink, SortingMap, NavBarItem, IconData, Ingredient, DrinkInput }
