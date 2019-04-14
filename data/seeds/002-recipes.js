
exports.seed = function(knex, Promise) {
  return knex('recipes').insert([
    { name: 'Tex-mex', dish_id: 1, instructions: '1. testing please work'},
    { name: 'Grannys', dish_id: 1, instructions: '1. tex mex testing'}, 
  ]);   
};
