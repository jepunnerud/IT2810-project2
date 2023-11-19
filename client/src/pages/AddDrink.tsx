import { useFieldArray, useForm, Controller } from 'react-hook-form'
import './AddDrink.css'
import { addDrinkToServer } from '../hooks/Drinks'
import { DrinkInput } from '../types'
import { useTheme } from '../hooks/ThemeContext'

function AddDrink() {
  const theme = useTheme()
  const { register, control, handleSubmit } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  async function onSubmit(data: object) {
    console.log(data)

    const formData = data as {
      name: string
      category: string
      alcoholic: string
      picture: string
      instructions: string
      ingredients: { ingredient: string; measure?: string }[]
      glass: string
    }

    const alcoholicBoolean = formData.alcoholic === 'yes'

    const ingredients = formData.ingredients.map((item) => ({
      ingredient: item.ingredient,
      measure: item.measure,
    }))

    const newDrink: DrinkInput = {
      name: formData.name,
      category: formData.category,
      alcoholic: alcoholicBoolean,
      picture: formData.picture,
      instructions: formData.instructions,
      ingredients: ingredients,
      glass: formData.glass,
    }

    console.log(formData)

    try {
      const valid = await addDrinkToServer(newDrink)
      if (!valid) {
        alert('Drink contains profanity. Change the input to add drink')
      } else {
        alert('Drink added successfully!')
      }
    } catch (error) {
      console.error('Error in onSubmit:', error)
      alert('An error occurred while adding drink')
    }
  }

  return (
    <div className={`add-drink-container ${theme}`}>
      <h1>✨Add new drinks here✨</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`add-drink-card ${theme}`}>
          <h3>
            Name:{' '}
            <input
              {...register('name', {
                required: 'Your drink needs a name',
              })}
            ></input>
          </h3>
          <h3>
            Ingredients:
            <section>
              <button
                className={`button ${theme}`}
                type="button"
                onClick={() => {
                  append({ ingredient: '', measure: '' })
                }}
              >
                Add new ingredient
              </button>
            </section>
          </h3>
          <ul>
            {fields.map((item, index) => {
              return (
                <p key={item.id}>
                  <input
                    {...register(`ingredients.${index}.ingredient`, {
                      required: true,
                    })}
                    placeholder="ingredient"
                  />
                  <Controller
                    render={({ field }) => <input {...field} placeholder="measure" />}
                    name={`ingredients.${index}.measure`}
                    control={control}
                  />
                  <button className={`button ${theme}`} type="button" onClick={() => remove(index)}>
                    Delete ingredient
                  </button>
                </p>
              )
            })}
          </ul>
          <h3>Instructions: </h3>
          <textarea
            className="instructions-input"
            {...register('instructions', {
              required: 'Instructions is required',
            })}
          ></textarea>

          <h3>Info: </h3>
          <p>
            Category:{' '}
            <select
              {...register('category', {
                required: 'Category is required',
              })}
            >
              <option value="ordinary">Ordinary drink</option>
              <option value="cocktail">Cocktail</option>
              <option value="shot">Shot</option>
              <option value="punch">Punch / Party Drink</option>
            </select>
          </p>
          <p>
            Glass:{' '}
            <select
              {...register('glass', {
                required: 'Glass is required',
              })}
            >
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
          <p>
            Alcoholic:
            <label>
              <input
                {...register('alcoholic')}
                type="radio"
                name="alcoholic"
                value={'yes'}
                checked
              />
              Yes
            </label>
            <label>
              <input {...register('alcoholic')} type="radio" name="alcoholic" value="false" />
              No
            </label>
          </p>
          <h3>
            Picture:{' '}
            <input
              className="input"
              type="text"
              {...register('picture', {
                required: 'Picture is required',
              })}
              placeholder="picture address"
            ></input>
          </h3>
        </div>
        <button className={`submit-button ${theme}`} type="submit">
          Add drink
        </button>
      </form>
    </div>
  )
}

export default AddDrink
