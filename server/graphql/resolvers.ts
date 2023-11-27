import { Mongoose, Types } from 'mongoose'
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
        if (ingredient === 'whisky') {
          ingredientFilter = {
            'ingredients.ingredient': {
              $in: [
                'Whiskey',
                'Bourbon',
                'Scotch',
                'Whisky',
                'whisky',
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
        const result = await Drink.aggregate([
          {
            $match: ingredientFilter,
          },
          {
            $facet: {
              drinks: [
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
              ],
              pageInfo: [{ $count: 'totalCount' }],
            },
          },
          {
            $project: {
              pageInfo: { $arrayElemAt: ['$pageInfo', 0] },
              drinks: '$drinks',
            },
          },
          {
            $addFields: {
              pageInfo: {
                totalPages: {
                  $ceil: { $divide: ['$pageInfo.totalCount', limit] },
                },
              },
            },
          },
        ])
        return result[0]
      } else {
        const result = await Drink.aggregate([
          {
            $facet: {
              drinks: [
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
              ],
              pageInfo: [{ $count: 'totalCount' }],
            },
          },
          {
            $project: {
              pageInfo: { $arrayElemAt: ['$pageInfo', 0] },
              drinks: '$drinks',
            },
          },
          {
            $addFields: {
              pageInfo: {
                totalPages: {
                  $ceil: { $divide: ['$pageInfo.totalCount', limit] },
                },
              },
            },
          },
        ])
        return result[0]
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
      const result = await Drink.aggregate([
        {
          $match: {
            $expr: {
              $in: [
                '$_id',
                favourites.map((i: string) => new Types.ObjectId(i)),
              ],
            },
          },
        },
        {
          $facet: {
            drinks: [
              {
                $project: {
                  name: 1,
                  picture: 1,
                  difficulty: { $strLenCP: '$instructions' },
                },
              },
              { $skip: skip },
              { $limit: limit },
            ],
            pageInfo: [{ $count: 'totalCount' }],
          },
        },
        {
          $project: {
            pageInfo: { $arrayElemAt: ['$pageInfo', 0] },
            drinks: '$drinks',
          },
        },
        {
          $addFields: {
            pageInfo: {
              totalPages: {
                $ceil: { $divide: ['$pageInfo.totalCount', limit] },
              },
            },
          },
        },
      ])
      return result[0]
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
        if (ingredient === 'whisky') {
          ingredientFilter = {
            'ingredients.ingredient': {
              $in: [
                'Whiskey',
                'Bourbon',
                'Scotch',
                'Whisky',
                'whisky',
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
        const result = await Drink.aggregate([
          {
            $match: { $and: [ingredientFilter, { $text: { $search: query } }] },
          },
          {
            $facet: {
              drinks: [
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
              ],
              pageInfo: [{ $count: 'totalCount' }],
            },
          },
          {
            $project: {
              pageInfo: { $arrayElemAt: ['$pageInfo', 0] },
              drinks: '$drinks',
            },
          },
          {
            $addFields: {
              pageInfo: {
                totalPages: {
                  $ceil: { $divide: ['$pageInfo.totalCount', limit] },
                },
              },
            },
          },
        ])
        return result[0]
      } else {
        const result = await Drink.aggregate([
          { $match: { $text: { $search: query } } },
          {
            $facet: {
              drinks: [
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
              ],
              pageInfo: [{ $count: 'totalCount' }],
            },
          },
          {
            $project: {
              pageInfo: { $arrayElemAt: ['$pageInfo', 0] },
              drinks: '$drinks',
            },
          },
          {
            $addFields: {
              pageInfo: {
                totalPages: {
                  $ceil: { $divide: ['$pageInfo.totalCount', limit] },
                },
              },
            },
          },
        ])
        return result[0]
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
