
exports.seed = function(knex, Promise) { 
  return knex('recipe_instructions').insert([
    { recipe_id: 1, instruction_id: 1},
  ]);   
};
