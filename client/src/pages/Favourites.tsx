import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import { updateDrinkOrder, useFavourites } from '../hooks/Drinks'
import '../utils/Loader.css'
import './Favourites.css'
import { ITEMS_PER_PAGE } from '../utils/constants'
import { useCallback, useEffect } from 'react'
import PageNavigation from '../components/PageNavigation'
import { useSearchParams } from 'react-router-dom'

export default function FavouritesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, loading, error } = useFavourites(
    JSON.parse(localStorage.getItem('drink-favourites') || '[]'),
    ITEMS_PER_PAGE,
    (parseInt(searchParams.get('page') || '1') - 1) * ITEMS_PER_PAGE
  )

  const setIsLastPage = useCallback(
    (isLastPage: boolean) => {
      if (isLastPage)
        setSearchParams((searchParams) => {
          searchParams.set('lastPage', 'true')
          return searchParams
        })
      else
        setSearchParams((searchParams) => {
          searchParams.delete('lastPage')
          return searchParams
        })
    },
    [setSearchParams]
  )

  const changePage = useCallback(
    (delta: number) => {
      const currentPage = parseInt(searchParams.get('page') || '1')
      if (delta === -1) setIsLastPage(false)
      if (currentPage + delta > 1) {
        setSearchParams((searchParams) => {
          searchParams.set('page', (currentPage + delta).toString())
          return searchParams
        })
      } else if (currentPage + delta === 1) {
        setSearchParams((searchParams) => {
          searchParams.delete('page')
          return searchParams
        })
      }
    },
    [setSearchParams, setIsLastPage, searchParams]
  )

  useEffect(() => {
    if (data) updateDrinkOrder([...data.favourites.drinks])
  }, [data])

  if (error) return <span className="error">Error: {error.message}</span>
  if (loading) return <span className="loader"></span>
  return (
    <div className="favourite-page-container">
      <h1>Favourites</h1>
      <div className="card-container">
        {data.favourites.drinks.map((d: Drink) => (
          <DrinkCard drink={d} key={d._id} />
        ))}
      </div>
      <PageNavigation
        currentPage={parseInt(searchParams.get('page') || '1')}
        totalPages={data!.favourites.pageInfo.totalPages}
        onChangePage={changePage}
      />
    </div>
  )
}
