
exports.seed = function(knex, Promise) {
 
  return knex('ingredients').insert([
    { name: 'Ground beef' },
    { name: 'Mexican Cheese' },
  ]);    
};
