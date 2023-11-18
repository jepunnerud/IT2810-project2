import DrinkCard from '../components/DrinkCard'
import FilterDropdown from '../components/FilterDropdown'
import SearchBar from '../components/SearchBar'
import { Drink } from '../types'
import { sortingFns } from '../utils/constants'
import '../utils/Loader.css'
import { useDrinks } from '../hooks/Drinks'
import './Home.css'
import Fuse from 'fuse.js'
import { useCallback, useState } from 'react'
import { ITEMS_PER_PAGE } from '../utils/constants'
import PageNavigation from '../components/PageNavigation'

function HomePage() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterParam, setFilterParam] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [queryData, setQueryData] = useState<string[]>([])
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  const { data, loading, error } = useDrinks(
    filterParam,
    ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE
  )

  const updateDrinkOrder = useCallback(() => {
    if (data) {
      const drinks = [...data!.drinks]
      try {
        if (drinks.length === 0) throw new Error('No drinks found')
      } catch (error) {
        setCurrentPage(currentPage - 1)
        setIsLastPage(true)
      }
      const newDrinkOrder = drinks
        .sort(sortingFns['alphabetically'])
        .map((drink: Drink) => drink.id)
      console.log(newDrinkOrder)
      localStorage.setItem('drinkOrder', JSON.stringify(newDrinkOrder))
    }
  }, [data, currentPage])

  updateDrinkOrder()

  if (loading) return <span className="loader"></span>
  if (error) return <span>Error</span>

  const search = (query: string) => {
    const searchOptions = {
      keys: ['value'],
      threshold: 0.3,
    }
    const fuse = new Fuse(
      data!.drinks.map((d: Drink) => d.name),
      searchOptions
    )
    const fuseResults: Fuse.FuseResult<string>[] = fuse.search(query)
    const results = [] as string[]
    fuseResults.map((result) => results.push(result.item))
    setQueryData(results)
  }

  const changePage = (delta: number) => {
    if (currentPage + delta > 0) {
      setCurrentPage(currentPage + delta)
      setIsLastPage(false)
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className="home-top-container">
        <SearchBar placeholder="Search" searchHandler={search} inputHandler={setSearchInput} />
        <FilterDropdown
          value={filterParam}
          changeHandler={setFilterParam}
          label="Filter by ingredient"
          pageHandler={setCurrentPage}
          lastPageHandler={setIsLastPage}
        />
      </div>
      {
        <div className="card-container">
          {queryData.length === 0 && searchInput.length > 0 ? (
            <span>No drinks matched your query</span>
          ) : (
            data!.drinks
              .filter((d: Drink) => queryData.includes(d.name) || queryData.length === 0)
              .sort(sortingFns['alphabetically'])
              .map((d: Drink) => <DrinkCard drink={d} key={d.id} />)
          )}
        </div>
      }
      <PageNavigation currentPage={currentPage} isLastPage={isLastPage} onChangePage={changePage} />
    </>
  )
}

export default HomePage
