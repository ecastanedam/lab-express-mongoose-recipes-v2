const express = require("express");
const logger = require("morgan");


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
// app.get('/', (req, res) => {
//     res.send("<h1>LAB | Express Mongoose Recipes</h1>");
// });


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
const Recipe = require('./models/Recipe.model');

app.post('/recipes', (req, res) => {
    Recipe.create(req.body)  
        .then((createdRecipe) => {
            console.log('Created recipe:', createdRecipe);
            res.status(201).json(createdRecipe);
        })
        .catch((error) => {
            console.error('Error creating recipe:', error);
            res.status(500).json({ message: 'Error creating recipe' });
        });
    })
            


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', (req,res) => {
    Recipe.find()
        .then((allRecipes) => {
            console.log('All recipes:', allRecipes);
            res.status(200).json(allRecipes);
        })
        .catch((error) => {
            console.error('Error getting recipes:', error);
            res.status(500).json({ error: 'Error getting recipes' });
        })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', (req, res) => {
    const { id } = req.params;
    Recipe.findById(id)
        .then((recipe) => {
            console.log('Recipe found:', recipe);            
            res.status(200).json(recipe);
        })
        .catch((error) => {
            console.error('Error getting recipe:', error);
            res.status(500).json({ error: 'Error getting recipe' });
        });
    
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id', (req, res) => {
    const { id } = req.params;  
    Recipe.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedRecipe) => {
            console.log('Updated recipe:', updatedRecipe);
            res.status(200).json(updatedRecipe);
        })
        .catch((error) => {
            console.error('Error updating recipe:', error);
            res.status(500).json({ error: 'Error updating recipe' });
        });
    
})




//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req, res) => {
   Recipe.findByIdAndDelete(req.params.id) 
        .then(() => {
            console.log('Recipe deleted');
            res.status(204).send();
        })
        .catch((error) => {
            console.error('Error deleting recipe:', error);
            res.status(500).json({ error: 'Error deleting recipe' });
        });
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
