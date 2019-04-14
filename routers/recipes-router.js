const recipeRouter = require("express").Router();
const knex = require("knex");

const recipedb = require("../data/dbConfig.js");
const Recipes = require("../helpers/recipes-model.js");

recipeRouter.get("/", async (req, res) => {
  try {
    const recipes = await Recipes.getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: `The recipe information couldn't be retrieved: ${error}`
    });
  }
});

recipeRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  recipedb("recipes")
    .where({ id })
    .first()
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Error occurred while retrieving recipe: ${error}` });
    });
});

recipeRouter.post("/", (req, res) => {
  const newRecipe = req.body;
  Recipes.addRecipe(newRecipe)
    .then(recipe => {
      res.status(201).json(recipe);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `There was an error while saving the recipe to the database: ${error}`
        });
    });
});

recipeRouter.put("/:id", (req, res) => {
  recipedb("recipes")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "recipe does not exist" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Error occurred while updating recipe: ${error}` });
    });
});

recipeRouter.delete("/:id", async (req, res) => {
  try {
    const count = await recipedb("recipes")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: `Recipe does not exist` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error occurred while deleting recipe: ${error}` });
  }
});

module.exports = recipeRouter;
