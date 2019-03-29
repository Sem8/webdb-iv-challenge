const dishdb = require('../data/dbConfig');

module.exports = {
    getDishes, 
    getDish,
    addDish
};

function getDishes() {
    return dishdb('dishes');
};

function getDish(id) {
    return dishdb('dishes').where({ id }).first();
};

function addDish(dish) {
    return dishdb('dishes').insert(dish).then(([id]) => this.getDishes(id))
}