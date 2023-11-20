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
import { useSearchParams } from 'react-router-dom'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState<string>('')
  const [queryData, setQueryData] = useState<string[]>([])

  const { data, loading, error } = useDrinks(
    searchParams.get('filter') || '',
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
    [searchParams, setIsLastPage, setSearchParams]
  )

  const goToFirstPage = () => {
    setSearchParams((searchParams) => {
      searchParams.delete('page')
      return searchParams
    })
  }

  const handleFilterChange = (value: string) => {
    console.log(value)
    if (value !== '') {
      setSearchParams((searchParams) => {
        searchParams.set('filter', value)
        return searchParams
      })
    } else {
      setSearchParams((searchParams) => {
        searchParams.delete('filter')
        return searchParams
      })
    }
  }

  const updateDrinkOrder = useCallback(() => {
    if (data) {
      const drinks = [...data!.drinks]
      try {
        if (drinks.length === 0) throw new Error('No drinks found')
      } catch (error) {
        changePage(-1)
        setIsLastPage(true)
      }
      const newDrinkOrder = drinks
        .sort(sortingFns['alphabetically'])
        .map((drink: Drink) => drink.id)
      console.log(newDrinkOrder)
      localStorage.setItem('drinkOrder', JSON.stringify(newDrinkOrder))
    }
  }, [data, changePage, setIsLastPage])

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

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className="home-top-container">
        <SearchBar placeholder="Search" searchHandler={search} inputHandler={setSearchInput} />
        <FilterDropdown
          value={searchParams.get('filter') || ''}
          changeHandler={handleFilterChange}
          label="Filter by ingredient"
          pageHandler={goToFirstPage}
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
      <PageNavigation
        currentPage={parseInt(searchParams.get('page') || '1')}
        isLastPage={searchParams.get('lastPage') === 'true'}
        onChangePage={changePage}
      />
    </>
  )
}

export default HomePage
