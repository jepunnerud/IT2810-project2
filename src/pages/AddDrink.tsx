import { useState } from "react";
import { Ingredient } from "../types";
import { useFieldArray, useForm, Controller } from 'react-hook-form';

//vil droppe følgende ting fra databasen: 
//instruksjoner på flere språk
//id genereres i backend
function AddDrinks() {

    const [isIngredientInputHidden, setIsIngredientInputHidden] = useState(true);
    const [ingredient, setIngredient] = useState("");
    const [measurement, setMeasurment] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [error, setError] = useState();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
      });

    function handleOnClickNewIngredient() {
        setIsIngredientInputHidden(!isIngredientInputHidden);
        setIngredient("");
        setMeasurment("");
    }

    function handleOnClickAddIngredient() {
        setIngredients([...ingredients, (measurement) ? { ingredient: ingredient, measure: measurement } : { ingredient: ingredient }])
        setIsIngredientInputHidden(!isIngredientInputHidden);
    }

    function onSubmit(data: any) {
        console.log("data", data);
    }

    return (
        <>
        <h1>Add new drinks here</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
                {fields.map((item, index) => {
                return (
                    <li key={item.id}>
                    <input
                        {...register(`ingredients.${index}.ingredient`, { required: true })}
                    />
                    <Controller
                        render={({ field }) => <input {...field} />}
                        name={`ingredients.${index}.measure`}
                        control={control}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Delete ingredient
                    </button>
                    </li>
                );
                })}
            </ul>
            <section>
                <button
                type="button"
                onClick={() => {
                    append({ ingredient: "", measure: "" });
                }}
                >
                Add new ingredient
                </button>
            
                

                
            </section>

            <input type="submit" />
        </form>

            {/* <h1>Add new drinks here</h1>
            <div className="info-card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Name:
                        <input
                            {...register('name', {
                                required: 'Your drink needs a name'
                            })}>
                        </input></h2>

                    <h2>Ingredients: </h2>

                    <button onClick={handleOnClickNewIngredient} hidden={!isIngredientInputHidden}>Add new ingredient</button>
                    <div className="ingredient-input" hidden={isIngredientInputHidden}>
                        <p>Add new ingredient:
                            <input
                                value={ingredient}
                                onChange={(e) => {
                                    setIngredient(e.target.value)
                                }}
                            /></p>
                        <p>Measure:
                            <input
                                value={measurement}
                                onChange={(e) => {
                                    setMeasurment(e.target.value)
                                }}
                            /></p>
                        <button onClick={handleOnClickAddIngredient}>Add</button>
                    </div>
                    <div className="ingredients-list">
                        {ingredients.map((i: Ingredient) => <p>{(i.measure === undefined) ? "- " + i.ingredient : "- " + i.ingredient + ": " + i.measure}</p>)}
                        
                    </div>
                    <h2>Instructions</h2>
                        <input
                            id="instuctions"
                            type="text"
                            {...register('instructions', {
                                required: 'Instructions is required'
                            })}
                        ></input>
                    <h2>Info</h2>
                    <p>Category:
                        <select
                            {...register('category', {
                                required: 'Category is required'
                            })}>
                            <option value="ordinary">Ordinary drink</option>
                            <option value="cocktail">Cocktail</option>
                            <option value="shot">Shot</option>
                            <option value="punch">Punch / Party Drink</option>
                        </select>
                    </p>
                    <p>Glass:
                        <select
                            {...register('glass', {
                                required: 'Glass is required'
                            })}>
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
                        <label><input {...register('alcoholic')} type="radio" name="alcoholic" value="yes" checked />Yes</label>
                        <label><input {...register('alcoholic')} type="radio" name="alcoholic" value="no" />No</label>
                    </p>
                </form>                  
            </div>
            <button type="submit">Add drink</button> */}
        </>
    )
}

export default AddDrinks