import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import '../utils/Loader.css'
import { useState } from 'react'
import { sortingFns } from '../utils/constants'
import './Home.css'
import './SelectionMenu.css'
import '../components/SearchBar.css'
import { useDrinks } from '../hooks/Drinks'
import SearchBar from '../components/SearchBar'
import Fuse from 'fuse.js'

function HomePage() {
  const [sortParam, setSortParam] = useState('alphabetically')

  const [searchInput, setSearchInput] = useState<string>('')
  const [queryData, setQueryData] = useState<string[]>([])
  //Add data from JSON, extraxt with function
  //Dummy variables:

  const { data, isLoading, error } = useDrinks()

  function updateDrinkOrder() {
    if (data && data.length > 0) {
      const newDrinkOrder = data.sort(sortingFns[
        'alphabetically'
      ])
        .map(drink => drink.drinkid)
      localStorage.setItem('drinkOrder', JSON.stringify(newDrinkOrder))
    }
  }

  updateDrinkOrder()

  if (isLoading) return <span className="loader"></span>
  if (error) return <span>Error</span>

  const search = (query: string) => {
    const searchOptions = {
      keys: ['value'],
      threshold: 0.3,
    }
    const fuse = new Fuse(
      data!.map((d: Drink) => d.name),
      searchOptions
    )
    const fuseResults: Fuse.FuseResult<string>[] = fuse.search(query)
    const results = [] as string[]
    fuseResults.map((result) => results.push(result.item))
    setQueryData(results)
  }
  return (
    <>
      <div className="home-top-container">
        <SearchBar
          placeholder="Search"
          searchHandler={search}
          inputHandler={setSearchInput}
        />
        <div className="dropdown-container">
          <label htmlFor="sorting-parameter">Sort by </label>
          <select
            id="sorting-parameter"
            value={sortParam}
            onChange={(e) => {
              setSortParam(e.target.value)
              updateDrinkOrder()
            }}
          >
            <option value="alphabetically">Name</option>
          </select>
        </div>
      </div>
      {
        <div className="card-container">
          {queryData.length === 0 && searchInput.length > 0 ? (
            <span>No drinks matched your query</span>
          ) : (
            data
              ?.filter(
                (d: Drink) =>
                  queryData.includes(d.name) || queryData.length === 0
              )
              ?.sort(sortingFns[sortParam])
              ?.map((d: Drink) => <DrinkCard drink={d} key={d.drinkid} />)
          )}
        </div>
      }
    </>
  )
}

export default HomePage
