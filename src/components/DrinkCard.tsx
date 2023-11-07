import { Link } from 'react-router-dom'
import { Drink } from '../types'
import './DrinkCard.css'
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/ThemeContext'

function DrinkCard(props: { drink: Drink }) {
  const [isFavourite, setIsFavourite] = useState(false)

  const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(props.drink.drinkid))
  }, [storedFavourites, props.drink.drinkid])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(props.drink.drinkid)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      const newList: string[] = storedFavourites.filter((id: string) => id !== props.drink.drinkid)
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
    }
  }

  const theme = useTheme()

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="card-wrapper">
        <div className="favourite-icon-wrapper">
          <span
            className={`material-symbols-outlined favourite-icon ${
              isFavourite && 'is-favourite'
            } ${theme}`}
            onClick={() => handleOnClick()}
          >
            star
          </span>
        </div>
        <Link to={'/info/' + props.drink.drinkid}>
          <div className={`card ${theme}`}>
            <img src={props.drink.picture} alt={props.drink.name} />
            <p>{props.drink.name}</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default DrinkCard
