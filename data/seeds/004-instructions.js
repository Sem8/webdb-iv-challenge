
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('instructions').insert([
    { steps: '1. cook meat, 2. Add sliced onions' },

  ]);
   
};
