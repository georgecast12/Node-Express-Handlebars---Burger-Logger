// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function(app) {
  // GET route for getting all of the Burger-orders
  app.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.burgers.findAll({}).then(function(dbBurgers) {
      // We have access to the burgers as an argument inside of the callback function
      res.json(dbBurgers);
    });
  });

  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to insert
    // into our table. In this case we just we pass in an object with a text and
    // boolean
    db.burgers
      .create({
        burger_name: req.body.text,
        devoured: false
      })
      .then(function(dbBurgers) {
        // We have access to the new burger as an argument inside of the callback function
        res.json(dbBurgers);
      });
  });

  // DELETE route for "devouring" the burger. We can get the id of the burger to be deleted
  // from req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    // Destroy takes in one argument: a "where object describing the burgers we want to destroy
    db.burgers
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbBurgers) {
        res.json(dbBurgers);
      });
  });

  // PUT route for updating burger. We can get the updated burger data from req.body
  app.put("/api/burgers", function(req, res) {
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the burger we want to update
    db.burgers
      .update(
        {
          text: req.body.text,
          complete: req.body.complete
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
      .then(function(dbBurgers) {
        res.json(dbBurgers);
      });
  });
};
