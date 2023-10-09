import { Drink } from '../types'
import './DrinkCard.css'

function DrinkCard(props: { drink: Drink }) {
    return (
        <>
            <a href={'/info/' + props.drink.idDrink}>
                <div className="card">
                    <img src={props.drink.picture.png} alt={props.drink.name} />
                    <p>{props.drink.name}</p>
                </div>
            </a>
        </>
    )
}

export default DrinkCard
