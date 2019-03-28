const dishRouter = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./data/recipeDish.sqlite3"
    }
};

const dishdb = knex(knexConfig);

dishRouter.get('/', (req, res) => {
    
    res.send('get all dishes data here');
})

module.exports = dishRouter;