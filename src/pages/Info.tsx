import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDrink } from '../hooks/Drinks'
import '../utils/Loader.css'

export default function InfoPage() {
  let { drinkid } = useParams<{ drinkid: string }>()
  drinkid = drinkid ? drinkid : ''
  const [isFavourite, setIsFavourite] = useState(false)
  const [message, setMessage] = useState('')
  const { data, isLoading, error } = useDrink(drinkid)

  const storedFavourites = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  )

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

  if (isLoading) return <span className="loader"></span>
  if (error) return <span>Error</span>

  return (
    <>
      <h1>{data!.name}</h1>
      <div>
        <img src={data!.picture} alt={data!.name} />
        {<button onClick={handleOnClick}>{message}</button>}
      </div>
      <div className="infoSection"></div>
    </>
  )
}
