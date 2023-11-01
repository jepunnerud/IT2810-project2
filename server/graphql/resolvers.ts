import Drink from "../models/drink"



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
        //Funker ikke, skal legge til drinker
        async addDrink(_: any, { drinkID }: { drinkID: string }) {
            return await Drink.findById(drinkID);
        },
    }
}

export default resolvers
