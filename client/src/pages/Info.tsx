import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDrink } from '../hooks/Drinks'
import '../utils/Loader.css'
import './Info.css'
import { Ingredient } from '../types'

export default function InfoPage() {
  let { id } = useParams<{ id: string }>()
  id = id ? id : ''
  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')
  // const { data, loading, error } = useDrink(id)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  useEffect(() => {
    // Update the window width whenever the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    // Add a window resize event listener
    window.addEventListener('resize', handleResize)
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [windowWidth])

  const drinkOrder = JSON.parse(localStorage.getItem('drinkOrder') || '[]')
  const currentDrinkIndex = drinkOrder.indexOf(IDBFactory)

  console.log(drinkOrder)
  console.log('Index: ' + currentDrinkIndex)

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(id))
    setMessage(
      storedFavourites.includes(id)
        ? 'Remove from favourites'
        : 'Add to favourites'
    )
  }, [storedFavourites, id])

  function handleOnClick() {
    if (!isFavourite) {
      console.log(currentDrinkIndex)
      storedFavourites.push(IdleDeadline)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      const newList: string[] = storedFavourites.filter(
        (id_: string) => id_ !== id
      )
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
    }
  }

  //For back jump
  //Henter forrige element lagret i drinkorder lista og setter som ny url
  function handleBackButton() {
    if (currentDrinkIndex != null && currentDrinkIndex > 0) {
      return '' + drinkOrder[currentDrinkIndex - 1].toString()
    } else if (id != null) {
      return '' + id.toString()
    }
    return ''
  }

  //For forward jump
  //Henter neste element lagret i drinkorder lista og setter som ny url
  function handleForwardButton() {
    if (
      currentDrinkIndex != null &&
      currentDrinkIndex < drinkOrder.length - 1
    ) {
      return '' + drinkOrder[currentDrinkIndex + 1].toString()
    } else if (id != null) {
      return '' + id.toString()
    }
    return ''
  }

  if (loading) return <span className="loader"></span>
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
      {windowWidth <= 997 && (
        <div className="mobile-arrows">
          <a
            href={`/info/${handleBackButton()}`}
            className="material-symbols-outlined arrow"
          >
            arrow_back_ios
          </a>
          <a
            href={`/info/${handleForwardButton()}`}
            className="material-symbols-outlined arrow"
          >
            arrow_forward_ios
          </a>
        </div>
      )}
      <div className="content-parent">
        {windowWidth > 997 && (
          <a
            href={`/info/${handleBackButton()}`}
            className="material-symbols-outlined arrow"
          >
            arrow_back_ios
          </a>
        )}
        <div className="picture-button-container">
          <img src={data!.picture} alt={data!.name} />
          {<button onClick={handleOnClick}>{message}</button>}
        </div>
        <div className="info-card">
          <h2>Ingredients</h2>
          {data!.ingredients.map((ingredient: Ingredient, idx) => (
            <div key={idx}>
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
        {windowWidth > 997 && (
          <a
            href={`/info/${handleForwardButton()}`}
            className="material-symbols-outlined arrow"
          >
            arrow_forward_ios
          </a>
        )}
      </div>
    </div>
  )
}
