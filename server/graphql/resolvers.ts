import Drink from '../models/drink'
import { DrinkInput } from '../types'

const resolvers = {
  Query: {
    async drinks(
      _: any,
      {
        ingredient,
        limit,
        skip,
        sort,
      }: { ingredient: string; limit: number; skip: number; sort: string }
    ) {
      let ingredientFilter = null
      if (ingredient !== '') {
        if (ingredient === 'whiskey') {
          ingredientFilter = {
            'ingredients.ingredient': {
              $in: [
                'Whiskey',
                'Bourbon',
                'Scotch',
                'Whiskey',
                'whiskey',
                'bourbon',
                'scotch',
                'whiskey',
              ],
            },
          }
        } else {
          ingredientFilter = {
            'ingredients.ingredient': {
              $in: [
                ingredient,
                ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
              ],
            },
          }
        }
      }
      const sortType = sort.split('-')[0]
      const sortDirection = sort.split('-')[1] === 'asc' ? 1 : -1
      let sortObj: Record<string, 1 | -1> = {}
      sortObj[sortType] = sortDirection
      if (ingredientFilter) {
        return await Drink.aggregate([
          {
            $match: ingredientFilter,
          },
          {
            $project: {
              name: 1,
              picture: 1,
              difficulty: { $strLenCP: '$instructions' },
            },
          },
          { $sort: sortObj },
          { $skip: skip },
          { $limit: limit },
        ])
      } else {
        return await Drink.aggregate([
          {
            $project: {
              name: 1,
              picture: 1,
              difficulty: { $strLenCP: '$instructions' },
            },
          },
          { $sort: sortObj },
          { $skip: skip },
          { $limit: limit },
        ])
      }
    },
    async drink(_: any, { id }: { id: string }) {
      return await Drink.findById(id)
    },
    async favourites(
      _: any,
      {
        favourites,
        limit,
        skip,
      }: { favourites: string[]; limit: number; skip: number }
    ) {
      return await Drink.find({ _id: { $in: favourites } })
        .skip(skip)
        .limit(limit)
    },
    async search(
      _: any,
      {
        query,
        ingredient,
        limit,
        skip,
        sort,
      }: {
        query: string
        ingredient: string
        limit: number
        skip: number
        sort: string
      }
    ) {
      let ingredientFilter = null
      if (ingredient !== '') {
        if (ingredient === 'whiskey') {
          ingredientFilter = {
            'ingredients.ingredient': {
              $in: [
                'Whiskey',
                'Bourbon',
                'Scotch',
                'Whiskey',
                'whiskey',
                'bourbon',
                'scotch',
                'whiskey',
              ],
            },
          }
        } else {
          ingredientFilter = {
            'ingredients.ingredient': {
              $in: [
                ingredient,
                ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
              ],
            },
          }
        }
      }
      const sortType = sort.split('-')[0]
      const sortDirection = sort.split('-')[1] === 'asc' ? 1 : -1
      let sortObj: Record<string, 1 | -1> = {}
      sortObj[sortType] = sortDirection
      if (ingredientFilter) {
        return await Drink.aggregate([
          {
            $match: { $and: [ingredientFilter, { $text: { $search: query } }] },
          },
          {
            $project: {
              name: 1,
              picture: 1,
              difficulty: { $strLenCP: '$instructions' },
            },
          },
          { $sort: sortObj },
          { $skip: skip },
          { $limit: limit },
        ])
      } else {
        return await Drink.aggregate([
          { $match: { $text: { $search: query } } },
          {
            $project: {
              name: 1,
              picture: 1,
              difficulty: { $strLenCP: '$instructions' },
            },
          },
          { $sort: sortObj },
          { $skip: skip },
          { $limit: limit },
        ])
      }
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
      return { id: res._id }
    },
    async updateDrink(
      _: any,
      { id, input }: { id: string; input: DrinkInput }
    ) {
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
