import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import { useFavourites } from '../hooks/Drinks'
import '../utils/Loader.css'
import './Favourites.css'
import { ITEMS_PER_PAGE } from '../utils/constants'
import { useEffect, useState } from 'react'
import PageNavigation from '../components/PageNavigation'

export default function FavouritesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const storedFavourites: string[] = JSON.parse(localStorage.getItem('favourites') || '[]')
  const { data, loading } = useFavourites(
    storedFavourites,
    ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE
  )

  useEffect(() => {
    if (data) {
      try {
        if (data.favourites.length === 0) throw new Error('No drinks found')
      } catch (error) {
        setCurrentPage(currentPage - 1)
        setIsLastPage(true)
      }
    }
  }, [data, currentPage])

  const changePage = (delta: number) => {
    if (currentPage + delta > 0) {
      setCurrentPage(currentPage + delta)
      setIsLastPage(false)
    }
  }

  if (loading) return <span className="loader"></span>
  return (
    <div className="favourite-page-container">
      <h1>Favoritter</h1>
      <div className="card-container">
        {data.favourites.map((d: Drink) => (
          <DrinkCard drink={d} />
        ))}
      </div>
      <PageNavigation currentPage={currentPage} isLastPage={isLastPage} onChangePage={changePage} />
    </div>
  )
}
