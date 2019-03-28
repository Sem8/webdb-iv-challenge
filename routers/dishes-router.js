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

// dishRouter.get('/', (req, res) => {
    
//     res.send('get all dishes data here');
// })

dishRouter.get("/", (req, res) => {
    dishdb("dishes")
      .then(dishdb => {
        res.status(200).json(dishdb);
      })
      .catch(error => {
        res.status(500).json({
          message: `The dishes information could not be retrieved: ${error}`
        });
      });
    // res.send('get all cohort data here');
  });
  
  dishRouter.get("/:id", (req, res) => {
    const { id } = req.params;
  
    dishdb("dishes")
      .where({ id })
      .first()
      .then(cohort => {
        res.status(200).json(cohort);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: `Error occurred while retrieving cohort: ${error}` });
      });
  });
  
  dishRouter.post("/", (req, res) => {
    dishdb("dishes")
      .insert(req.body)
      .then(ids => {
        const id = ids[0];
        dishdb("dishdb")
          .where({ id })
          .first()
          .then(cohort => {
            res.status(201).json(cohort);
          });
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: `A new cohort couldn't be made: ${error}` });
      });
  });
  
  dishRouter.put("/:id", (req, res) => {
    dishdb("dishes")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "Cohort does not exist" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: `Error occurred while updating cohort: ${error}` });
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
        res.status(404).json({ message: "Cohort not found" });
      }
    } catch (error) {
      res.status(500).json({ error: `Error occurred while deleting cohort: ${error}` });
    }
  });
  
  dishRouter.get("/:id/students", async (req, res) => {
    try {
      const students = await dishdb("recipes").where({
        cohort_id: req.params.id
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = dishRouter;