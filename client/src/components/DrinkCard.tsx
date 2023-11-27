import { Link } from 'react-router-dom'
import { Drink } from '../types'
import './DrinkCard.css'
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/ThemeContext'

function DrinkCard(props: { drink: Drink }) {
  const [isFavourite, setIsFavourite] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('drink-favourites') || '[]')
    setIsFavourite(storedFavourites.includes(props.drink._id))
  }, [props.drink._id])

  function handleOnClick() {
    const storedFavourites = JSON.parse(localStorage.getItem('drink-favourites') || '[]')

    if (!isFavourite) {
      storedFavourites.push(props.drink._id)
      localStorage.setItem('drink-favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      localStorage.setItem(
        'drink-favourites',
        JSON.stringify(storedFavourites.filter((id: string) => id !== props.drink._id))
      )
      setIsFavourite(false)
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="card-wrapper">
        <Link to={'/info/' + props.drink._id} data-testid={`drink-card-${props.drink.name}`}>
          <div className={`card ${theme}`}>
            <img src={props.drink.picture} alt={props.drink.name} data-testid="picture" />
            <p className={theme} data-testid="drinkname">
              {props.drink.name}
            </p>
          </div>
        </Link>
        <div
          className="favourite-icon-wrapper"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleOnClick()
            }
          }}
        >
          <span
            data-testid={`favourite-button-${props.drink.name}`}
            className={`material-symbols-outlined favourite-icon ${
              isFavourite && 'is-favourite'
            } ${theme}`}
            onClick={() => handleOnClick()}
          >
            star
          </span>
        </div>
      </div>
    </>
  )
}

export default DrinkCard
