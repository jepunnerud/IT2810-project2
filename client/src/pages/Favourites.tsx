import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import { useDrinks, loadAllDrinksFromServer } from '../hooks/Drinks'
import { sortingFns } from '../utils/constants'
import '../utils/Loader.css'
import './Favourites.css'
import { useQuery } from 'react-query'

export default function FavouritesPage() {
  const storedFavourites = localStorage.getItem('favourites')
  const { data, isLoading } = useDrinks()
  //const { data, isLoading } = loadAllDrinksFromServer()
  // const { data: data, isLoading } = useQuery(['drinks'], loadAllDrinksFromServer);
  const favoriteDrinks: Drink[] = data
    ? data.filter((drink: Drink) => storedFavourites?.includes(drink.drinkid))
    : []
  if (isLoading) return <span className="loader"></span>
  return (
    <div className="favourite-page-container">
      <h1>Favoritter</h1>
      <div className="card-container">
        {favoriteDrinks
          ?.sort(sortingFns['alphabetically'])
          .map((d) => <DrinkCard drink={d} />)}
      </div>
    </div>
  )
}
