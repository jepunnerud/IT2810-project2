import fetchLetter from './fetcher'
import { addDrinkToServer } from '../hooks/Drinks'
import { DrinkInput } from '../types';


const fetchList = ['f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'o', 'p', 'q', 'r', 'u', 'w', 'x', 'y', 'z']

async function processData() {
    fetchList.forEach(async (letter) => {
        try {
            const letterList = await fetchLetter(letter);
            const transformed = transform(letterList); // assuming 'transform' is defined elsewhere
            transformed.forEach((drink) => {
                addDrinkToServer(drink); // assuming 'addDrinkToServer' is defined elsewhere
            });
        } catch (error) {
            console.error(`Error processing letter ${letter}:`, error);
        }
    });
}

//processData()
function transformToDrinkInput(data) {
    return data.map(drink => ({
        name: drink.name,
        category: drink.category,
        alcoholic: drink.alcoholic,
        glass: drink.glass,
        instructions: drink.instructions,
        picture: drink.picture,
        ingredients: drink.ingredients.map((ingredient) => ({
            ingredient: ingredient.ingredient,
            measure: ingredient.measure || undefined
        }))
    }));
}

function transform(data) {
    let transformedData = [];

    data["drinks"].forEach(drink => {
        // Create a new object for the transformed data
        let transformedDrink = {
            name: drink["strDrink"],
            category: drink["strCategory"],
            alcoholic: drink["strAlcoholic"].toLowerCase() === "alcoholic",
            glass: drink["strGlass"],
            instructions: drink["strInstructions"],
            picture: drink["strDrinkThumb"],
            ingredients: []
        };

        // Loop through ingredients and add them to the "ingredients" list
        for (let i = 1; i <= 15; i++) {
            let ingredientKey = `strIngredient${i}`;
            let measureKey = `strMeasure${i}`;
            let ingredient = drink[ingredientKey];
            let measure = drink[measureKey];

            if (ingredient) {
                transformedDrink.ingredients.push({
                    ingredient: ingredient,
                    measure: measure ? measure : ""
                });
            }
        }
        transformedData.push(transformedDrink);
    });
}
