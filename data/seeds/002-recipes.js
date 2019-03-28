
exports.seed = function(knex, Promise) {
  return knex('recipes').insert([
    { name: 'Tex-mex', dish_id: 1},
    { name: 'Grannys', dish_id: 1},
  ]);   
};
