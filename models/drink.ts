import mongoose from "mongoose";
import { Drink, Ingredient } from "../src/types";
import { ListFormat } from "typescript";

const ingredientSchema = new mongoose.Schema({
    ingredient: { type: String, required: true, trim: true },
    measure: { type: String, required: true, trim: true }
})

const drinkSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    drinkid: { type: String, required: true, trim: true, unique: true },
    category: { type: String, required: true, trim: true },
    picture: { type: String, required: true, trim: true },
    instructions: { type: String, required: true, trim: true },
    alcoholic: { type: Boolean, required: true, trim: true },
    ingredients: [ingredientSchema],
    //Usikker på om det å lage enda et schema er riktig her
    glass: { type: String, required: true, trim: true },

});

export default mongoose.model<Drink & mongoose.Document>("Drink", drinkSchema);


