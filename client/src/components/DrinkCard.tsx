import { Link } from 'react-router-dom'
import { Drink } from '../types'
import './DrinkCard.css'
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/ThemeContext'

function DrinkCard(props: { drink: Drink }) {
  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
    setIsFavourite(storedFavourites.includes(props.drink._id))
  }, [props.drink._id])

  function handleOnClick() {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

    if (!isFavourite) {
      storedFavourites.push(props.drink._id)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      localStorage.setItem(
        'favourites',
        JSON.stringify(storedFavourites.filter((id: string) => id !== props.drink._id))
      )
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
        <Link to={'/info/' + props.drink._id} data-testid={`drink-card-${props.drink.name}`}>
          <div className={`card ${theme}`}>
            <img src={props.drink.picture} alt={props.drink.name} data-testid="picture" />
            <p className={theme}>{props.drink.name}</p>
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
