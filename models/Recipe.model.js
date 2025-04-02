// Your code here ...
//Iteration 2 - Create the Recipe model
const mongoose = require('mongoose');
const { Schema } = mongoose;    //const Schema = mongoose.Schema;

//Create Schema
const recipeSchema = new Schema({
    title:{type: String, required: true, unique: true},
    instructions: {type: String, required: true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: {type: [String]},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    isArchived: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}
});

//Create Model
const Recipe = mongoose.model('Recipe', recipeSchema);

//Export Model
module.exports = Recipe;

