import Drink from "../models/drink"
import { DrinkInput } from "../types";



const resolvers = {
    Query: {
        drinks: async () => {
            return await Drink.find()
        },
        async drink(_: any, { drinkID }: { drinkID: string }) {
            return await Drink.findById(drinkID);
        },

    },
    Mutation: {
        async addDrink(
            _: any,
            {
                input: { name, category, picture, instructions, alcoholic, ingredients, glass },
            }: { input: DrinkInput }
        ) {
            const addedDrink = new Drink({
                name,
                category,
                picture,
                instructions,
                alcoholic,
                ingredients,
                glass
            });
            // save the book to the database
            const res = await addedDrink.save();

            return { id: res.id };
        },
        // updates a book by ID
        async updateDrink(
            _: any,
            {
                drinkid,
                input: { name, category, picture, instructions, alcoholic, ingredients, glass },
            }: { drinkid: String; input: DrinkInput }
        ) {
            const updatedDrink = Drink.findByIdAndUpdate(drinkid, {
                name,
                category,
                picture,
                instructions,
                alcoholic,
                ingredients,
                glass
            });

            return updatedDrink;
        },
        // deletes a book by ID
        async deleteDrink(_: any, { ID }: { ID: string }) {
            const wasDeleted = await Drink.findById(ID).deleteOne();
            return wasDeleted;
        },
    },

}

export default resolvers
