import { Drink, SortingMap } from '../types'

const sortingFns: SortingMap = {
  alphabetically: (d1: Drink, d2: Drink) => (d1.name > d2.name ? 1 : -1),
}

const COLORS = {
  darkBackround: '#151515',
  lightBackground: '#c7f9cc',
}

const ITEMS_PER_PAGE = 12

export { sortingFns, COLORS, ITEMS_PER_PAGE }
