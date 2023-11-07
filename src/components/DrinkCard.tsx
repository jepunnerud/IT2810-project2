import { Link } from 'react-router-dom'
import { Drink } from '../types'
import './DrinkCard.css'
import { useTheme } from '../hooks/ThemeContext'

function DrinkCard(props: { drink: Drink }) {
  const theme = useTheme()

  return (
    <>
      <Link to={'/info/' + props.drink.drinkid}>
        <div className={`card ${theme}`}>
          <img src={props.drink.picture} alt={props.drink.name} />
          <p>{props.drink.name}</p>
        </div>
      </Link>
    </>
  )
}

export default DrinkCard
