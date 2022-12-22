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
    const {
      recipeId,
			recipeTitle,
      recipeAuthor,
			createdAt,
      recipeContent,
      recipeCategory,
       } = req.body; 
		const post = [recipeId,recipeTitle,recipeAuthor,createdAt,recipeContent,recipeCategory];
		const sql = 'INSERT INTO recipes (recipeId,recipeTitle,recipeAuthor,createdAt,recipeContent,recipeCategory) VALUES (?,?,?,?,?,?)';
		// console.log(req.body);
    mysqlConnect.query(sql, post, (err, results) => {
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
