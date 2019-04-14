exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipe_ingredients").insert([
    { recipe_id: 1, ingredient_id: 1, amount: 2 }
  ]);
};
