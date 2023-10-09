import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDrink } from '../hooks/Drinks'
import '../utils/Loader.css'

export default function InfoPage() {
  let { idDrink } = useParams<{ idDrink: string }>()
  idDrink = idDrink ? idDrink : ''
  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(idDrink))
    setMessage(
      storedFavourites.includes(idDrink)
        ? 'Fjern fra favoritter'
        : 'Legg til favoritt'
    )
  }, [storedFavourites, idDrink])

  function handleOnClick() {
    if (!isFavourite) {
      storedFavourites.push(idDrink)
      localStorage.setItem('favourites', JSON.stringify(storedFavourites))
      setIsFavourite(true)
      setMessage('Fjern fra favoritter')
    } else {
      const newList: string[] = storedFavourites.filter(
        (id: string) => id !== idDrink
      )
      localStorage.setItem('favourites', JSON.stringify(newList))
      setIsFavourite(false)
      setMessage('Legg til favoritt')
    }
  }

  const { data, isLoading } = useDrink(idDrink)

  if (isLoading) return <span className="loader"></span>

  if (Array.isArray(data)) {
    const drink = data[0]; // Now TypeScript knows 'data' is an array
    // Rest of your code here
    return (
      <>
        <h1>{drink.name}</h1>
        <div>
          <img src={drink.DrinkPicture.png} alt={drink.name.common} />
          {<button onClick={handleOnClick}>{message}</button>}
        </div>
        <div className="infoSection">
        </div>
      </>
    )
  }
}
