import { useFieldArray, useForm } from 'react-hook-form'
import './AddDrink.css'
import { addDrinkToServer } from '../hooks/Drinks'
import { DrinkInput } from '../types'
import { useTheme } from '../hooks/ThemeContext'
import '../components/Dropdown.css'
import { deleteDrinkFromServer } from '../hooks/Drinks'

function AddDrink() {
  const theme = useTheme()
  const { register, control, handleSubmit } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  console.log(deleteDrinkFromServer('655b31a7f377fd64ed4a6478'))

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
        const form = document.getElementById('form') as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      console.error('Error in onSubmit:', error)
      alert('An error occurred while adding drink')
    }
  }

  return (
    <div className={`add-drink-container ${theme}`}>
      <h1>✨Add new drinks here✨</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)} id="form">
        <div className={`add-drink-card ${theme}`}>
          <h3>
            Name:{' '}
            <input
              data-testid="name-input"
              className={`input ${theme}`}
              {...register('name', {
                required: true,
              })}
            ></input>
          </h3>
          <h3>
            Ingredients:
            <section>
              <button
                data-testid="add-ingredient-button"
                className={`button form-button ${theme}`}
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
            <div className="ingredient-input-container">
              {fields.map((item, index) => {
                return (
                  <p key={item.id}>
                    <div className="ingredient-input-wrapper">
                      <input
                        data-testid={`ingredient-${index}`}
                        className={`input ${theme}`}
                        {...register(`ingredients.${index}.ingredient`, {
                          required: true,
                        })}
                        placeholder="ingredient"
                      />
                      <input
                        data-testid={`measure-${index}`}
                        className={`input ${theme}`}
                        {...register(`ingredients.${index}.measure`, {
                          required: false,
                        })}
                        placeholder="measure"
                      />
                      <span
                        data-testid={`delete-ingredient-${index}`}
                        className={`material-symbols-outlined clear-button ${theme}`}
                        onClick={() => {
                          remove(index)
                        }}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            remove(index)
                          }
                        }}
                      >
                        close
                      </span>
                    </div>
                  </p>
                )
              })}
            </div>
          </ul>
          <h3>Instructions: </h3>
          <textarea
            data-testid="instructions-input"
            className={`input text-area ${theme}`}
            {...register('instructions', {
              required: true,
            })}
          ></textarea>

          <h3>Info: </h3>
          <div className="info-container">
            <p>
              Category:{' '}
              <select
                className={`dropdown form-dropdown ${theme}`}
                {...register('category', {
                  required: true,
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
                data-testid="glass"
                className={`dropdown form-dropdown ${theme}`}
                {...register('glass', {
                  required: true,
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
                  className={`input input-radio ${theme}`}
                  {...register('alcoholic')}
                  type="radio"
                  name="alcoholic"
                  value={'yes'}
                  checked
                />
                Yes
              </label>
              <label>
                <input
                  className={`input ${theme}`}
                  {...register('alcoholic')}
                  type="radio"
                  name="alcoholic"
                  value="false"
                />
                No
              </label>
            </p>
            <h3>
              Picture:{' '}
              <input
                data-testid="picture"
                className={`input ${theme}`}
                type="text"
                {...register('picture', {
                  required: true,
                })}
                placeholder="Image url"
              ></input>
            </h3>
          </div>
        </div>
        <button
          data-testid="add-drink-button"
          className={`button submit-button ${theme}`}
          type="submit"
        >
          Add drink
        </button>
      </form>
    </div>
  )
}

export default AddDrink
