import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import '../utils/Loader.css'
import { useState } from 'react'
import { sortingFns } from '../utils/constants'
import './Home.css'
import './SearchBar.css'
import { useDrinks } from '../hooks/Drinks'
import FilterDropdown from '../components/FilterDropdown'

function HomePage() {
  const [filterParam, setFilterParam] = useState<string>('')

  const includes_ingredient = (d: Drink, param: string) => {
    if (!param) {
      return true
    }
    const ingredients = d.ingredients.map((i) => i.ingredient.toLowerCase())
    return ingredients.includes(param)
  }

  //Add data from JSON, extraxt with function
  //Dummy variables:
  const { data, isLoading, error } = useDrinks()

  if (isLoading) return <span className="loader"></span>
  if (error) return <span>Error</span>
  return (
    <>
      <div className="home-top-container">
        <div className="searchbar-container">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span className="material-symbols-outlined">search</span>
          <input
            id="input"
            className="searchbar-input"
            placeholder={'Search'}
            //onInput={search}
          ></input>
        </div>
        <FilterDropdown
          value={filterParam}
          changeHandler={setFilterParam}
          label="Filter by ingredient"
        />
      </div>
      {
        <div className="card-container">
          {data!
            .sort(sortingFns['alphabetically'])
            .filter((d: Drink) => includes_ingredient(d, filterParam))
            .map((d: Drink) => (
              <DrinkCard drink={d} key={d.drinkid} /> // Use 'idDrink' as the key instead of 'name'
            ))}
        </div>
      }
    </>
  )
}

export default HomePage
