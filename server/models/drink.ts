import mongoose from 'mongoose'
import { DrinkType, IngredientType } from '../types'

const ingredientSchema = new mongoose.Schema({
  ingredient: { type: String, required: true, trim: true },
  measure: { type: String, required: false, trim: true },
})

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  picture: { type: String, required: true, trim: true },
  instructions: { type: String, required: true, trim: true },
  alcoholic: { type: Boolean, required: true, trim: true },
  ingredients: [ingredientSchema],
  glass: { type: String, required: true, trim: true },
})

export default mongoose.model<DrinkType & mongoose.Document>(
  'DrinkType',
  drinkSchema
)
