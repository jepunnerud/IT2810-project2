import DrinkCard from '../components/DrinkCard'
import FilterDropdown from '../components/FilterDropdown'
import SearchBar from '../components/SearchBar'
import { Drink } from '../types'
import '../utils/Loader.css'
import { updateDrinkOrder, useDrinks } from '../hooks/Drinks'
import './Home.css'
import { useCallback, useEffect } from 'react'
import { ITEMS_PER_PAGE } from '../utils/constants'
import PageNavigation from '../components/PageNavigation'
import { useSearchParams } from 'react-router-dom'
import SortingDropdown from '../components/SortingDropdown'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, loading, error } = useDrinks(
    searchParams.get('filter') || '',
    ITEMS_PER_PAGE,
    (parseInt(searchParams.get('page') || '1') - 1) * ITEMS_PER_PAGE,
    searchParams.get('sort') || 'name-asc'
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

  const handleSortingChange = (value: string) => {
    if (value !== 'name-asc') {
      setSearchParams((searchParams) => {
        searchParams.set('sort', value)
        return searchParams
      })
    } else {
      setSearchParams((searchParams) => {
        searchParams.delete('sort')
        return searchParams
      })
    }
  }

  useEffect(() => {
    if (data) updateDrinkOrder([...data.drinks.drinks])
  }, [data])

  if (loading) return <span className="loader"></span>
  if (error) return <span>Error</span>

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className="home-top-container">
        <SearchBar placeholder="Search" />
        <FilterDropdown
          value={searchParams.get('filter') || ''}
          changeHandler={handleFilterChange}
          label="Filter by ingredient"
          pageHandler={goToFirstPage}
          lastPageHandler={setIsLastPage}
        />
        <SortingDropdown
          value={searchParams.get('sort') || ''}
          label={'Sort by'}
          changeHandler={handleSortingChange}
          pageHandler={goToFirstPage}
          lastPageHandler={setIsLastPage}
        />
      </div>
      {
        <div className="card-container">
          {data!.drinks.drinks.map((d: Drink) => (
            <DrinkCard drink={d} key={d._id} />
          ))}
        </div>
      }
      <PageNavigation
        currentPage={parseInt(searchParams.get('page') || '1')}
        totalPages={data!.drinks.pageInfo.totalPages}
        onChangePage={changePage}
      />
    </>
  )
}

export default HomePage
