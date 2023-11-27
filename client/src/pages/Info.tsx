import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDrink } from '../hooks/Drinks'
import '../utils/Loader.css'
import './Info.css'
import { Ingredient } from '../types'
import { useTheme } from './../hooks/ThemeContext'

export default function InfoPage() {
  const { id = '' } = useParams<{ id?: string }>()
  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')
  const { data, loading, error } = useDrink(id)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const theme = useTheme()
  const breakPoint = 1024

  const storedFavourites = JSON.parse(localStorage.getItem('drink-favourites') || '[]')

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
  const currentDrinkIndex = drinkOrder.indexOf(id)

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(id))
    setMessage(storedFavourites.includes(id) ? 'Remove from favourites' : 'Add to favourites')
  }, [storedFavourites, id])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(id)
      localStorage.setItem('drink-favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
    } else {
      const newList: string[] = storedFavourites.filter((drinkid: string) => drinkid !== id)
      localStorage.setItem('drink-favourites', JSON.stringify(newList))
      setIsFavourite(false)
    }
  }

  //For back jump
  //Henter forrige element lagret i drinkorder lista og setter som ny url
  function handleBackButton() {
    if (currentDrinkIndex != null) {
      return '' + drinkOrder[currentDrinkIndex - 1].toString()
    } else if (id != null) {
      return '' + id.toString()
    }
    return ''
  }

  //For forward jump
  //Henter neste element lagret i drinkorder lista og setter som ny url
  function handleForwardButton() {
    if (currentDrinkIndex != null) {
      return '' + drinkOrder[currentDrinkIndex + 1].toString()
    } else if (id != null) {
      return '' + id.toString()
    }
    return ''
  }

  function splitLongWords(text: string) {
    const splitText = text.split(' ')
    const newText = splitText.map((word) => {
      if (word.length > 45) {
        return word.slice(0, 45) + '\n' + word.slice(45)
      } else {
        return word
      }
    })
    return newText.join(' ')
  }

  if (loading) return <span className="loader"></span>
  if (error) return <span>Error</span>

  return (
    <div className="info-page-container" data-testid="info-page">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <h1>{data!.drink.name}</h1>
      {windowWidth <= breakPoint && (
        <div className="mobile-arrows">
          {currentDrinkIndex > 0 && (
            <Link
              to={`/info/${handleBackButton()}`}
              className={`material-symbols-outlined arrow ${theme}`}
            >
              arrow_back_ios
            </Link>
          )}
          {currentDrinkIndex < drinkOrder.length - 1 && (
            <Link
              to={`/info/${handleForwardButton()}`}
              className={`material-symbols-outlined arrow ${theme}`}
            >
              arrow_forward_ios
            </Link>
          )}
        </div>
      )}
      <div className="content-parent">
        {windowWidth > breakPoint && currentDrinkIndex > 0 && (
          <Link
            to={`/info/${handleBackButton()}`}
            className={`material-symbols-outlined arrow ${theme}`}
          >
            arrow_back_ios
          </Link>
        )}
        <div className="picture-button-container">
          <img src={data!.drink.picture} alt={data!.drink.name} />
          {
            <button
              onClick={handleOnClick}
              className={`favourite-button ${theme}`}
              data-testid="add-to-favourites-button"
            >
              {message}
            </button>
          }
        </div>
        <div className={`info-card ${theme}`}>
          <h2>Ingredients</h2>
          {data!.drink!.ingredients!.map((ingredient: Ingredient, idx: number) => (
            <div key={idx}>
              <p>{ingredient.ingredient + (ingredient.measure ? ': ' + ingredient.measure : '')}</p>
            </div>
          ))}
          <h2>Instructions</h2>
          <p data-testid="instructions">{splitLongWords(data!.drink.instructions)}</p>
          <h2>Info</h2>
          <p>
            <b>Category:</b> {data!.drink.category}
          </p>
          <p>
            <b>Glass:</b> {data!.drink.glass}
          </p>
          <p>
            <b>Alcoholic</b>: {data!.drink.alcoholic ? 'Yes' : 'No'}
          </p>
        </div>
        {windowWidth > breakPoint && currentDrinkIndex < drinkOrder.length - 1 && (
          <Link
            to={`/info/${handleForwardButton()}`}
            className={`material-symbols-outlined arrow ${theme}`}
          >
            arrow_forward_ios
          </Link>
        )}
      </div>
    </div>
  )
}
