import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDrink } from '../hooks/Drinks'
import '../utils/Loader.css'
import './Info.css'
import { Ingredient } from '../types'

export default function InfoPage() {
  let { drinkid } = useParams<{ drinkid: string }>()
  drinkid = drinkid ? drinkid : ''
  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')
  const { data, isLoading, error } = useDrink(drinkid)

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  const drinkOrder = JSON.parse(
    localStorage.getItem('drinkOrder') || '[]'
  )
  const currentDrinkIndex = drinkOrder.indexOf(drinkid);


  console.log(drinkOrder)
  console.log("Index: " + currentDrinkIndex)


  useEffect(() => {
    setIsFavourite(storedFavourites.includes(drinkid))
    setMessage(
      storedFavourites.includes(drinkid)
        ? 'Fjern fra favoritter'
        : 'Legg til favoritt'
    )
  }, [storedFavourites, drinkid])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(drinkid)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
      setMessage('Fjern fra favoritter')
    } else {
      const newList: string[] = storedFavourites.filter(
        (id: string) => id !== drinkid
      )
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
      setMessage('Legg til favoritt')
    }
  }


  //For back jump
  //Henter forrige element lagret i drinkorder lista og setter som ny url
  function handleBackButton() {
    console.log('Back button clicked')
    if (currentDrinkIndex != null && currentDrinkIndex > 0) {
      return '' + drinkOrder[currentDrinkIndex - 1].toString()
    }
    return '' + drinkid
  }

  //For forward jump
  //Henter neste element lagret i drinkorder lista og setter som ny url
  function handleForwardButton() {
    console.log('Forward button clicked')
    if (currentDrinkIndex != null && currentDrinkIndex < drinkOrder.length) {
      return '' + drinkOrder[currentDrinkIndex + 1].toString()
    }
    return '' + drinkid
  }

  if (isLoading) return <span className="loader"></span>
  if (error) return <span>Error</span>

  return (
    <div className="info-page-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <h1>{data!.name}</h1>
      <div className="content-parent">
        <a href={`/info/${handleBackButton()}`} className="material-symbols-outlined arrow">
          arrow_back_ios
        </a>
        <div className="picture-button-container">
          <img src={data!.picture} alt={data!.name} />
          {<button onClick={handleOnClick}>{message}</button>}
        </div>
        <div className="info-card">
          <h2>Ingredients</h2>
          {data!.ingredients.map((ingredient: Ingredient) => (
            <div>
              <p>
                {ingredient.ingredient +
                  (ingredient.measure ? ': ' + ingredient.measure : '')}
              </p>
            </div>
          ))}
          <h2>Instructions</h2>
          <p>{data!.instructions}</p>
          <h2>Info</h2>
          <p>Category: {data!.category}</p>
          <p>Glass: {data!.glass}</p>
          <p>Alcoholic: {data!.alcoholic ? 'Yes' : 'No'}</p>
        </div>
        <a href={`/info/${handleForwardButton()}`} className="material-symbols-outlined arrow">
          arrow_forward_ios
        </a>
      </div>
    </div>
  )
}
