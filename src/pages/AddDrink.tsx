import { useFieldArray, useForm, Controller } from 'react-hook-form';

function AddDrinks() {

    const {
        register,
        control,
        handleSubmit,
      } = useForm();

      const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
      });

    function onSubmit(data: any) {
        console.log("data", data);
    }

    return (
        <>
        <h1>Add new drinks here</h1>
        <div className="info-card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Name: </h2>
                    <input
                        {...register('name', {
                            required: 'Your drink needs a name'
                        })}>
                    </input>

                <h2>Ingredients: </h2>
                    <ul>
                        {fields.map((item, index) => {
                        return (
                            <p key={item.id}>
                            <input
                                {...register(`ingredients.${index}.ingredient`, { required: true })} placeholder="ingredient"
                            />
                            <Controller
                                render={({ field }) => <input {...field} placeholder="measure"/>}
                                name={`ingredients.${index}.measure`}
                                control={control}
                            />
                            <button type="button" onClick={() => remove(index)}>
                                Delete ingredient
                            </button>
                            </p>
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

                <h2>Instructions: </h2>
                    <input
                        id="instuctions"
                        type="text"
                        {...register('instructions', {
                            required: 'Instructions is required'
                        })}
                    ></input>

                <h2>Info: </h2>
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
                <button type="submit">Add drink</button> 
            </form>
        </div>
        </>
    )
}

export default AddDrinks