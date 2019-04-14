const dishRouter = require('express').Router();
const knex = require('knex');

const dishdb = require('../data/dbConfig');
const Dishes = require('../helpers/dishes-model.js');


  dishRouter.get("/", (req, res) => {
    Dishes.getDishes()
      .then(dishes => {
        res.status(200).json(dishes);
      })
      .catch(error => {
        res.status(500).json({
          message: `The dishes information could not be retrieved: ${error}`
        });
      });    
  });
  
    dishRouter.get("/:id", (req, res) => {
      
    Dishes.getDish(req.params.id)
      .then(dish => {
        res.status(200).json(dish);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: `Error occurred while retrieving dish: ${error}` });
      });
  });
  
 dishRouter.post("/", async (req, res) => {
    const { name } = req.body;
    if(!name ) {
      res.status(400).json({ message: 'Bad request, submit name of new dish'});
    } else {
      try {
        const { id } = await Dishes.addDish(req.body);
        const newDish = await Dishes.find(id);
        res.status(201).json(newDish);
      } catch (error) {
        res.status(500).json({ error: `Error occurred while creating dish: ${error}`});
      }
    }
  });
  
  dishRouter.put("/:id", (req, res) => {
    dishdb("dishes")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "dish does not exist" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: `Error occurred while updating dish: ${error}` });
      });
  });
  
  dishRouter.delete("/:id", async (req, res) => {
    try {
      const count = await dishdb("dishes")
        .where({ id: req.params.id })
        .del();
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "dish not found" });
      }
    } catch (error) {
      res.status(500).json({ error: `Error occurred while deleting dish: ${error}` });
    }
  });
  
  dishRouter.get("/:id/recipes", async (req, res) => {
    try {
      const students = await dishdb("recipes").where({
        dish_id: req.params.id
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = dishRouter;