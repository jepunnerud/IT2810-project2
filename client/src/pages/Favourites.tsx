import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import { useDrinks } from '../hooks/Drinks'
import { sortingFns } from '../utils/constants'
import { ITEMS_PER_PAGE } from '../utils/constants'
import { useState } from 'react'
import '../utils/Loader.css'
import './Favourites.css'

export default function FavouritesPage() {
  const [currentPage] = useState<number>(1)
  const storedFavourites = localStorage.getItem('favourites')
  const { data, loading } = useDrinks('', ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE)
  const favoriteDrinks: Drink[] = data
    ? data.drinks.filter((drink: Drink) => storedFavourites?.includes(drink.id))
    : []
  if (loading) return <span className="loader"></span>
  return (
    <div className="favourite-page-container">
      <h1>Favoritter</h1>
      <div className="card-container">
        {favoriteDrinks?.sort(sortingFns['alphabetically']).map((d) => <DrinkCard drink={d} />)}
      </div>
    </div>
  )
}
