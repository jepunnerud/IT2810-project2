import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import '../utils/Loader.css'
import { useState } from 'react'
import { sortingFns } from '../utils/constants'
import './Home.css'
import './SelectionMenu.css'
import './SearchBar.css'
import { useDrinks } from '../hooks/Drinks'

function HomePage() {
  const [sortParam, setSortParam] = useState('alphabetically')


  const { data, isLoading, error } = useDrinks()

  function updateDrinkOrder() {
    if (data && data.length > 0) {
      const newDrinkOrder = data.map(drink => drink.drinkid)
      localStorage.setItem('drinkOrder', JSON.stringify(newDrinkOrder))
    }
  }

  updateDrinkOrder()

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
          {data!.sort(sortingFns[sortParam]).map((d: Drink) => (
            <DrinkCard drink={d} key={d.drinkid} /> // Use 'idDrink' as the key instead of 'name'
          ))}
        </div>
      }
    </>
  )
}

export default HomePage
