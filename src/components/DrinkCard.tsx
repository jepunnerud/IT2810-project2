import { Drink } from '../types'
import './DrinkCard.css'
import { useState, useEffect } from 'react'

function DrinkCard(props: { drink: Drink }) {
  const [isFavourite, setIsFavourite] = useState(false)

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(props.drink.drinkid))
  }, [storedFavourites])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(props.drink.drinkid)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      const newList: string[] = storedFavourites.filter(
        (id: string) => id !== props.drink.drinkid
      )
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="wrapper">
        <div className="icon-wrapper">
          <span
            className={`material-symbols-outlined ${
              isFavourite && 'favourite'
            }`}
            onClick={() => handleOnClick()}
          >
            star
          </span>
        </div>
        <a href={'/info/' + props.drink.drinkid}>
          <div className="card">
            <img src={props.drink.picture} alt={props.drink.name} />
            <p>{props.drink.name}</p>
          </div>
        </a>
      </div>
    </>
  )
}

export default DrinkCard
