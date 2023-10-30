import Drink from "../models/drink"



export const resolvers = {
    Query: {
        drinks: async () => {
            return await Drink.find()
        },
        async drink(_: any, { drinkID }: { drinkID: string }) {
            return await Drink.findById(drinkID);
        },

    },
    Mutation: {
        addDrink: async (_, { name }) => {
            // Ikke ferdig, legger til drink i databasen
        },
    },
};
