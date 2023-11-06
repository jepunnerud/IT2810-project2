import { useState } from "react";
import { Ingredient } from "../types";

//vil droppe følgende ting fra databasen: 
//instruksjoner på flere språk
//id genereres i backend
function AddDrinks() {
    
    const [isIngredientInputHidden, setIsIngredientInputHidden] = useState(true);
    const [name, setName] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [measurement, setMeasurment] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    function handleOnClickNewIngredient() {
        setIsIngredientInputHidden(!isIngredientInputHidden);
        setIngredient("");
        setMeasurment("");
    }

    function handleOnClickAdd() {
        
        setIngredients([...ingredients, (measurement) ? {ingredient: ingredient, measure: measurement} :{ingredient: ingredient}])
        setIsIngredientInputHidden(!isIngredientInputHidden);
    }

    return (
        <>
        <h1>Add new drinks here</h1>
        <div className="info-card">
            <h2>Name: 
                <input value={name} 
                    onChange={(e) => {
                    setName(e.target.value)}}>
                </input></h2>
                <p>{name}</p>

            <h2>Ingredients: </h2>
                <button onClick={handleOnClickNewIngredient} hidden={!isIngredientInputHidden}>Add new ingredient</button>
                <div className="ingredient-input" hidden={isIngredientInputHidden}>
                    <p>Add new ingredient:
                        <input 
                            value={ingredient}
                            onChange={(e) => {
                            setIngredient(e.target.value)}} 
                        /></p>
                    <p>Measure: 
                        <input
                            value={measurement}
                            onChange={(e) => {
                            setMeasurment(e.target.value)}}
                        /></p>
                    <button onClick={handleOnClickAdd}>Add</button>
                </div>
                <p>{ingredients}</p>

            <h2>Instructions</h2>
                <input id="instuctions"></input>
            <h2>Info</h2>
                <p>Category:
                        <select>
                            <option value="ordinary">Ordinary drink</option>
                            <option value="cocktail">Cocktail</option>
                            <option value="shot">Shot</option>
                            <option value="punch">Punch / Party Drink</option>
                        </select>
                </p>
                <p>Glass:
                    <select>
                        <option value="cocktail-glass">Cocktail Glass</option>
                        <option value="collins">Gollins Glass</option>
                        <option value="shot-glass">Shot Glass</option>
                        <option value="martini">Martini Glass</option>
                        <option value="wine">Wine Glass</option>
                        <option value="highball">Highball Glass</option>
                        <option value="beer">Beer Mug</option>
                        <option value="old-fashioned">Old-fashioned Glass</option>
                    </select>
                </p>
                <p>Alcoholic:
                    <label><input type="radio" name="alcoholic" value="yes" />Yes</label>
                    <label><input type="radio" name="alcoholic" value="no" />No</label>
                </p>

        </div>
        </>
    )
}

export default AddDrinks