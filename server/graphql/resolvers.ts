import Drink from '../models/drink'
import { DrinkInput } from '../types'

const resolvers = {
  Query: {
    drinks: async (_: any, { ing }: { ing: string }) => {
      if (!ing) {
        return await Drink.find()
      }
      if (ing === 'whisky') {
        return await Drink.find({
          ingredients: {$elemMatch: {
            ingredient: [
                'Whisky',
                'Bourbon',
                'Scotch',
                'Whiskey',
                'whisky',
                'bourbon',
                'scotch',
                'whiskey',
              ],
            }},
          },
        )
      }
      return await Drink.find({
        ingredients: {$elemMatch: { 
          ingredient: [ing, ing.charAt(0).toUpperCase() + ing.slice(1)],
        }},
      })
    },
    async drink(_: any, { id }: { id: string }) {
      return await Drink.findById(id)
    },
  },
  Mutation: {
    async addDrink(
      _: any,
      {
        input: {
          name,
          category,
          picture,
          instructions,
          alcoholic,
          ingredients,
          glass,
        },
      }: { input: DrinkInput }
    ) {
      const addedDrink = new Drink({
        name,
        category,
        picture,
        instructions,
        alcoholic,
        ingredients,
        glass,
      })
      const res = await addedDrink.save()
      return { id: res.id }
    },

    updateDrink: async (
      _: any,
      { id, input }: { id: string; input: DrinkInput }
    ) => {
      const updatedDrink = await Drink.findByIdAndUpdate(id, input, {
        new: true,
      })
      return updatedDrink
    },

    async deleteDrink(_: any, { id }: { id: string }) {
      const wasDeleted = await Drink.findByIdAndDelete(id)
      return wasDeleted != null
    },
  },
}

export default resolvers
