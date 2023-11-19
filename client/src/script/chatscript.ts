import { DrinkInput, Ingredient } from '../types'; // Assuming types.ts is in the same directory
import { addDrinkToServer } from '../hooks/Drinks';



async function fetchAndProcessDrinks(letter: string) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await response.json();

        for (const drink of data.drinks) {
            const transformedDrink = transformDrink(drink);
            console.log(transformedDrink);
            const result = await addDrinkToServer(transformedDrink);
            console.log('Drink added to server:', result);
        }
    } catch (error) {
        console.error(`Error fetching drinks for letter ${letter}:`, error);
    }
}

function transformDrink(drink: any): DrinkInput {
    let ingredients: Ingredient[] = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push({ ingredient, measure });
        }
    }

    return {
        name: drink.strDrink,
        category: drink.strCategory,
        alcoholic: drink.strAlcoholic === 'Alcoholic',
        glass: drink.strGlass,
        instructions: drink.strInstructions,
        picture: drink.strDrinkThumb,
        ingredients,
    };
}

const fetchList = ['g', 'h', 'i', 'j', 'k', 'l', 'n', 'o', 'p', 'q', 'r', 'u', 'w', 'x', 'y', 'z']

async function mainfunc() {
    for (const letter of fetchList) {
        await fetchAndProcessDrinks(letter);
    }
}



export default mainfunc;
