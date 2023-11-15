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

function HomePage() {
  const ITEMS_PER_PAGE = 20
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterParam, setFilterParam] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [queryData, setQueryData] = useState<string[]>([])

  //Add data from JSON, extraxt with function
  //Dummy variables:
  const { data, loading, error } = useDrinks(filterParam, (currentPage - 1) * ITEMS_PER_PAGE)

  const updateDrinkOrder = useCallback(() => {
    if (data) {
      const drinks = [...data!.drinks]
      const newDrinkOrder = drinks
        .sort(sortingFns['alphabetically'])
        .map((drink: Drink) => drink.id)
      console.log(newDrinkOrder)
      localStorage.setItem('drinkOrder', JSON.stringify(newDrinkOrder))
    }
  }, [data])

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

  const changePage = (delta: number) => () => {
    setCurrentPage(currentPage + delta)
  }

  return (
    <>
      <div className="home-top-container">
        <SearchBar placeholder="Search" searchHandler={search} inputHandler={setSearchInput} />
        <FilterDropdown
          value={filterParam}
          changeHandler={setFilterParam}
          label="Filter by ingredient"
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
      <div className="page-navigation">
        <button onClick={changePage(-1)} disabled={currentPage === 1}>
          Previous
        </button>
        <p>Page 1 of 10</p>
        <button onClick={changePage(1)} disabled={data.drinks.length !== ITEMS_PER_PAGE}>
          Next
        </button>
      </div>
    </>
  )
}

export default HomePage
