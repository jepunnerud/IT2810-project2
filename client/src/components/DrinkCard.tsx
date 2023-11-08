import { Drink } from '../types'
import './DrinkCard.css'

function DrinkCard(props: { drink: Drink }) {
  return (
    <>
      <a href={'/info/' + props.drink.id}>
        <div className="card">
          <img src={props.drink.picture} alt={props.drink.name} />
          <p>{props.drink.name}</p>
        </div>
      </a>
    </>
  )
}

export default DrinkCard
