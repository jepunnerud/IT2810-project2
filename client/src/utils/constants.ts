import { Drink, SortingMap } from '../types'

const sortingFns: SortingMap = {
  alphabetically: (d1: Drink, d2: Drink) => (d1.name > d2.name ? 1 : -1),
}

export { sortingFns }
