import { Drink } from '../types'
import DrinkCard from '../components/DrinkCard'
import '../utils/Loader.css'
import { useState } from 'react'
import Fuse from 'fuse.js'
import { sortingFns } from '../utils/constants'
import './Home.css'
import './SelectionMenu.css'
import './SearchBar.css'
import { useDrinks, useDrink } from '../hooks/Drinks'

function HomePage() {
    const [sortParam, setSortParam] = useState('alphabetically')

    //Add data from JSON, extraxt with function
    //Dummy variables:

    const { data, isLoading } = useDrinks()
    const [query, setQuery] = useState<string>(''); // Initialize 'query' as an empty string



    if (isLoading) return <span className="loader"></span>
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
                        }}
                    >
                        <option value="alphabetically">Name</option>
                    </select>
                </div>
            </div>
            {
                <div className="card-container">
                    {data
                        .filter((d: Drink) => query.includes(d.name) || query.length === 0)
                        .sort(sortingFns[sortParam])
                        .map((d: Drink) => (
                            <DrinkCard drink={d} key={d.idDrink} /> // Use 'idDrink' as the key instead of 'name'
                        ))}
                </div>
            }
        </>
    )
}

export default HomePage
