const express = require("express");

const mysqlConnect = require("../data_base.js");

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    mysqlConnect.query("SELECT * from recipes", (err, row, field) => {
      if (!err) {
        res.status(200).send(row);
      } else {
        console.log(err);
      }
    });
  })
  .post((req, res) => {
    const recipe = {
      recipeId: req.body.recipeId,
      recipeTitle: req.body.recipeTitle,
      recipeAuthor: req.body.recipeAuthor,
      recipeContent: req.body.recipeContent,
      recipeCategory: req.body.recipeCategory,
      createdAt: req.body.createdAt,
    };
    mysqlConnect.query("INSERT INTO recipes SET?", recipe, (err, results) => {
      if (!err) {
        res.status(201).send(`post added with ID:${results.insertId}`);
      } else {
        console.log(err);
      }
    });
  })
  .put((req, res) => {
    console.log(req.body)
    const id = req.body.recipeId;
    const recipe = {
      title: req.body.recipeTitle,
      author: req.body.recipeAuthor,
      content: req.body.recipeContent,
      category: req.body.recipeCategory,
    };
    mysqlConnect.query(
      "UPDATE recipes SET ? WHERE recipeId = ?",
      [recipe, id],
      (err, results) => {
        if (!err) {
          res.send(`Recipe update with ID: ${id}`);
        } else {
          console.log(err);
        }
      }
    );
  })
  .delete((req, res) => {
    const id = req.params.recipeId;
    mysqlConnect.query(
      "DELETE FROM recipes WHERE recipeId = ?",
      id,
      (err, results) => {
        if (!err) {
          res.send(`Recipe deleted with ID:${id}`);
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = Router;
