const recipedb = require('../data/dbConfig.js');

module.exports = {
    getRecipes,
    addRecipe
}

function getRecipes() {
    return recipedb('recipes');
};

function getRecipeById(id) {
    return recipedb('recipes').where({ id }).first();
};

function addRecipe(recipe) {
    return recipedb('recipes').insert(recipe).then(ids => {
        return getRecipeById(ids[0]);
    });
};