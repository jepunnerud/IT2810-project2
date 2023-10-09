interface Drink {
  name: string
  idDrink: string
  category: string
  picture: DrinkPicture
  instructions: string
  alcoholic: boolean
  measures: Measures
  ingrediendts: Ingrediendts
}


interface DrinkPicture {
  svg: string
  png: string
  alt: string
}

interface Measures {
  measures: [string]
}

interface Ingrediendts {
  ingredients: [string]
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

export type { Drink, SortingMap, NavBarItem, IconData }
