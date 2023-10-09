
//Fetcher drinks fra databasen/json. Ikke ferdig
import { useQuery } from '@tanstack/react-query';
import { Drink } from '../types.ts';
import fs from 'fs';
import path from 'path';

function readDrinksFromJson() {
    const drinksFilePath = path.join(__dirname, '.../drinks.json');
    const drinksData = fs.readFileSync(drinksFilePath, 'utf8');
    return JSON.parse(drinksData);
}


function useDrinks() {
    return useQuery({
        queryFn: async () => {
            const drinks = readDrinksFromJson();
            return drinks;
        },
        queryKey: ['drinks'],
    });
}


function useDrink(idDrink: string) {
    return useQuery<Drink | undefined>({
        queryFn: async () => {
            const drinks = readDrinksFromJson();
            const drink = drinks.find((d: Drink) => d.idDrink === idDrink);
            return drink;
        },
        queryKey: ['drink', idDrink],
    });
}

export { useDrinks, useDrink };
