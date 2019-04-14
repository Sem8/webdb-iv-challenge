
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dishes').insert([
    { name: 'Taco' },
    { name: 'Pizza' },
  ]);    
};
